// system
import {
  AudioPlayer,
  AudioPlayerState,
  AudioPlayerStatus,
  AudioResource,
  createAudioPlayer,
  createAudioResource,
  entersState,
  NoSubscriberBehavior,
  VoiceConnection,
  VoiceConnectionDisconnectReason,
  VoiceConnectionState,
  VoiceConnectionStatus
} from "@discordjs/voice"
import { getFreeClientID, setToken, stream } from "play-dl"
// constants
import { MEDIA_SOURCES } from "@cross/constants/media"
import { MUSIC_PLAYER_STATUS } from "@cross/constants/musicPlayer"
// types
import { SongInfo } from "@cross/types/database/media"
import {
  MusicPlayerAvailableStatus,
  MusicPlayerResponse
} from "@cross/types/media/musicPlayer"

export interface QueueOptions {
  connection: VoiceConnection
}

const MAX_REJOIN_ATTEMPTS = 5

const TIME_TO_FORCE_CONNECTION_DESTROY = 300000

/**
 * A class representing a music queue
 */
export class MusicQueue {
  public readonly connection: VoiceConnection
  public readonly player: AudioPlayer

  /** Last error message */
  private error?: string
  /** Index of the current song in the queue */
  private currentSongIdx?: number
  /** Semaphore to prevent multiple ready events */
  private connectionLock = false
  /** Semaphore to prevent multiple queue processing at the same time */
  private queueProcessingLock = false
  /** Status of the queue */
  private status: MusicPlayerAvailableStatus = MUSIC_PLAYER_STATUS.EMPTY
  /** Whether the queue is looping */
  private isLooping = true
  /** List of songs in the queue */
  private songs: SongInfo[] = []
  /** Timeout to forcibly destroy connection after stopping the queue */
  private timeoutBeforeConnectionDestroy: NodeJS.Timeout | null = null
  /** SoundCloud client ID for audio streaming */
  private soundCloudClientId?: string
  /** Audio resource for the current song */
  private audioResource?: AudioResource

  public constructor(options: QueueOptions) {
    this.connection = options.connection
    this.player = createAudioPlayer({
      behaviors: { noSubscriber: NoSubscriberBehavior.Play }
    })
    this.connection.subscribe(this.player)

    /**
     * Handles changes in the network state by clearing the keep-alive interval
     * of the new UDP network state.
     *
     * @param oldNetworkState - The previous network state.
     * @param newNetworkState - The updated network state.
     */
    const networkStateChangeHandler = (
      oldNetworkState: any,
      newNetworkState: any
    ) => {
      const newUdp = Reflect.get(newNetworkState, "udp")
      clearInterval(newUdp?.keepAliveInterval)
    }

    this.connection.on(
      "stateChange" as any,
      async (
        oldState: VoiceConnectionState,
        newState: VoiceConnectionState
      ) => {
        // Refresh state change event listener
        Reflect.get(oldState, "networking")?.off(
          "stateChange",
          networkStateChangeHandler
        )
        Reflect.get(newState, "networking")?.on(
          "stateChange",
          networkStateChangeHandler
        )

        // If the connection is dropped, we basically try to rejoin the channel
        if (newState.status === VoiceConnectionStatus.Disconnected) {
          if (
            newState.reason ===
              VoiceConnectionDisconnectReason.WebSocketClose &&
            newState.closeCode === 4014
          ) {
            // On closed socket we just stop
            return this.stop()
          }
          if (this.connection.rejoinAttempts >= MAX_REJOIN_ATTEMPTS) {
            // If there are too many failed rejoin attempts, we stop
            return this.connection.destroy()
          }
          // It could be a connection issue, so let's attempt to reconnect
          const wait = (delay: number) =>
            new Promise((res) => setTimeout(res, delay))
          await wait((this.connection.rejoinAttempts + 1) * 5_000)
          return this.connection.rejoin()
        }
        // If connection is not ready, we wait for it to be ready
        if (
          !this.connectionLock &&
          (newState.status === VoiceConnectionStatus.Connecting ||
            newState.status === VoiceConnectionStatus.Signalling)
        ) {
          // Set a lock to prevent multiple ready events
          this.connectionLock = true
          try {
            await entersState(
              this.connection,
              VoiceConnectionStatus.Ready,
              20_000
            )
          } catch {
            if (
              this.connection.state.status !== VoiceConnectionStatus.Destroyed
            ) {
              try {
                this.connection.destroy()
              } catch {}
            }
          } finally {
            // Don't forget to release the lock
            this.connectionLock = false
          }
        }
      }
    )

    this.player.on(
      "stateChange" as any,
      async (oldState: AudioPlayerState, newState: AudioPlayerState) => {
        if (
          oldState.status !== AudioPlayerStatus.Idle &&
          newState.status === AudioPlayerStatus.Idle
        ) {
          if (this.songs.length) {
            // Set status to switching to correctly handle the queue
            this.status = MUSIC_PLAYER_STATUS.SWITCHING
            this.processQueue()
          }
        }
      }
    )

    this.player.on("error", (error) => {
      this.handleError(error.message)
    })
  }

  /**
   * Sets the looping state of the music queue.
   *
   * @param isLooping - A boolean indicating whether the music queue should loop.
   */
  public setLoop(isLooping: boolean) {
    this.isLooping = isLooping
  }

  /**
   * Stops the music player and resets its state.
   *
   * @param {string} [errorMessage] - Optional. The error message to be displayed when stopping the player.
   * @remarks
   * The connection will be destroyed after a delay defined by `TIME_TO_FORCE_CONNECTION_DESTROY` if no actions occur.
   */
  public stop(errorMessage?: string) {
    if (this.status === MUSIC_PLAYER_STATUS.STOPPED) return

    // Set up all properties for the stopped state
    this.status = MUSIC_PLAYER_STATUS.STOPPED
    this.isLooping = true
    this.audioResource?.playStream.destroy()
    this.audioResource = undefined
    this.currentSongIdx = undefined
    this.songs = []

    this.player.stop()

    this.closeConnectionAfterTimeout()
  }

  /**
   * Adds one or more songs to the music queue.
   * If the music player is currently stopped, it starts processing the queue.
   *
   * @param {...SongInfo[]} songs - The songs to be added to the queue.
   */
  public async enqueue(...songs: SongInfo[]) {
    this.songs = this.songs.concat(songs)
    if (
      this.status === MUSIC_PLAYER_STATUS.STOPPED ||
      this.status === MUSIC_PLAYER_STATUS.PAUSED
    ) {
      await this.processQueue()
    }
  }

  /**
   * Plays the provided songs or resumes playing from the queue if no songs are provided.
   * If songs are provided, the queue is stopped and replaced with the new songs.
   * If you want to add songs to the queue, use the `enqueue` method.
   *
   * @param songs - An optional array of SongInfo objects to be played.
   */
  public async play(songs?: SongInfo[]) {
    if (songs) {
      await this.stop()
      await this.enqueue(...songs)
    }
    if (this.status === MUSIC_PLAYER_STATUS.STOPPED) {
      await this.processQueue()
    }
  }

  /**
   * Pauses the currently playing music. It does nothing if the music player is not in the `PLAYING` state.
   */
  public async pause() {
    if (this.status !== MUSIC_PLAYER_STATUS.PLAYING) return
    try {
      this.player.pause()
      this.audioResource?.playStream.pause()
      this.status = MUSIC_PLAYER_STATUS.PAUSED
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to pause the current song"
      this.handleError(errorMessage)
    }
    this.closeConnectionAfterTimeout()
  }

  /**
   * Resumes the music player if it is currently paused.
   * If the music player is not in the paused state, the method will return without performing any action.
   */
  public async resume() {
    if (this.status !== MUSIC_PLAYER_STATUS.PAUSED) return
    return await this.processQueue()
  }

  /**
   * Retrieves the current status of the music queue. It returns queue status, current song and queue information.
   * It also return error message if there is any error, after that the error state will be cleared.
   *
   * @returns {MusicPlayerResponse} An object containing the current status of the music player's queue
   */
  public getQueueStatus(): MusicPlayerResponse {
    let response: MusicPlayerResponse = {
      status: this.status,
      song:
        this.currentSongIdx !== undefined
          ? this.songs[this.currentSongIdx]
          : undefined,
      currentSongIndex: this.currentSongIdx,
      queue: this.songs || undefined,
      error: this.error ? { message: this.error } : undefined
    }
    if (this.status === MUSIC_PLAYER_STATUS.ERROR) {
      this.clearErrorState()
    }
    return response
  }

  /**
   * Retrieves the current status of the connection and player.
   *
   * @returns An object containing the status of the connection and player.
   * @property {string} connection - The current status of the connection.
   * @property {string} player - The current status of the player.
   */
  public getConnectionStatus() {
    return {
      connection: this.connection.state.status,
      player: this.player.state.status
    }
  }

  public disconnect() {
    if (this.timeoutBeforeConnectionDestroy)
      clearTimeout(this.timeoutBeforeConnectionDestroy)
    this.connection.destroy()
    this.status = MUSIC_PLAYER_STATUS.EMPTY
  }

  /**
   * The error state and message is meant to be shown to the user and should be cleared after being displayed.
   * This function will clears the error state of the music player.
   */
  private clearErrorState() {
    if (this.status === MUSIC_PLAYER_STATUS.ERROR) {
      this.error = undefined
      this.status = MUSIC_PLAYER_STATUS.STOPPED
    }
  }

  /**
   * Handles errors that occur during music playback.
   * Stops the music player and sets the error state.
   *
   * @param errorMessage - An optional error message describing the error.
   */
  private handleError(errorMessage?: string) {
    this.status = MUSIC_PLAYER_STATUS.ERROR
    this.error = errorMessage
    this.audioResource?.playStream.destroy()
    this.audioResource = undefined
    this.player.stop()
    this.closeConnectionAfterTimeout()
  }

  /**
   * Closes the voice connection after a specified timeout if no actions are performed.
   */
  private closeConnectionAfterTimeout() {
    // Preventing multiple connection destroying attempts
    if (this.timeoutBeforeConnectionDestroy !== null) return

    // If there are no actions for a while, we destroy the connection
    this.timeoutBeforeConnectionDestroy = setTimeout(() => {
      if (this.connection.state.status !== VoiceConnectionStatus.Destroyed) {
        try {
          this.connection.destroy()
          this.status = MUSIC_PLAYER_STATUS.EMPTY
        } catch {}
      }
    }, TIME_TO_FORCE_CONNECTION_DESTROY)
  }

  /**
   * Processes the music queue by playing the next song in the queue.
   */
  private async processQueue() {
    if (this.timeoutBeforeConnectionDestroy !== null) {
      clearTimeout(this.timeoutBeforeConnectionDestroy)
      this.timeoutBeforeConnectionDestroy = null
    }
    this.clearErrorState()
    if (this.queueProcessingLock) {
      return
    }

    const nextSong = this.getNextSongFromQueue()
    if (!nextSong) {
      this.stop()
      return
    }

    this.queueProcessingLock = true

    try {
      // There is already an audio resource
      if (this.audioResource) {
        // If the player is paused, resume it
        if (this.status === MUSIC_PLAYER_STATUS.PAUSED) {
          this.audioResource.playStream.resume()
          this.player.unpause()
          this.status = MUSIC_PLAYER_STATUS.PLAYING
        } else {
          // If the player is not paused, destroy the current audio resource, so we can create a new one
          this.audioResource.playStream.destroy()
        }
      }
      // If the player was not resumed, create a new audio resource
      if (this.status !== MUSIC_PLAYER_STATUS.PLAYING) {
        this.audioResource = await this.createVoiceResourceFromSong(nextSong)
        if (this.audioResource) {
          this.player.play(this.audioResource)
          this.audioResource.volume?.setVolumeLogarithmic(1)
          this.status = MUSIC_PLAYER_STATUS.PLAYING
        } else {
          this.stop("Failed to create audio resource")
        }
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Current song could not be played"
      this.handleError(errorMessage)
    } finally {
      this.queueProcessingLock = false
    }
  }

  /**
   * Retrieves the next song from the queue.
   *
   * @returns {SongInfo | undefined} The next song in the queue, or undefined if the queue is empty or the end of the queue is reached
   */
  private getNextSongFromQueue(): SongInfo | undefined {
    if (!this.songs.length) return undefined
    if (
      !!this.currentSongIdx &&
      this.status === MUSIC_PLAYER_STATUS.PAUSED &&
      this.songs[this.currentSongIdx]
    )
      return this.songs[this.currentSongIdx]
    // Queue always starts from the first song
    if (!this.currentSongIdx) {
      this.currentSongIdx = 0
      return this.songs[this.currentSongIdx]
    }
    // Move to the next song in the queue
    this.currentSongIdx++
    if (this.currentSongIdx < this.songs.length) {
      return this.songs[this.currentSongIdx]
    }
    // If the end of the queue is reached, reset the index
    this.currentSongIdx = undefined
    if (this.isLooping) {
      // If the queue is looping, start from the beginning
      return this.getNextSongFromQueue()
    }
    return undefined
  }

  /**
   * Creates an audio resource from a given song.
   *
   * @param song - The song information object containing details about the song.
   */
  private async createVoiceResourceFromSong(
    song: SongInfo
  ): Promise<AudioResource | undefined> {
    if (song.source === MEDIA_SOURCES.SOUNDCLOUD) {
      if (!this.soundCloudClientId) {
        this.soundCloudClientId = await getFreeClientID()
      }
      setToken({
        soundcloud: {
          client_id: this.soundCloudClientId
        }
      })
      const playStream = await stream(song.url)
      return createAudioResource(playStream.stream, {
        metadata: this,
        inputType: playStream.type,
        inlineVolume: true
      })
    }
    return undefined
  }
}
