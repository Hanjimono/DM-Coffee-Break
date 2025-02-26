// system
import {
  getVoiceConnection,
  joinVoiceChannel,
  VoiceConnectionStatus
} from "@discordjs/voice"
import log from "electron-log/main"
import { Client, GatewayIntentBits } from "discord.js"
// logic
import { MusicQueue } from "./musicQueue"
// constants
import {
  MUSIC_PLAYER_EMPTY_RESPONSE,
  MUSIC_PLAYER_STATUS
} from "@cross/constants/musicPlayer"
// errors
import { MusicPlayerUnexpectedError } from "@cross/errors/musicPlayerUnexpectedError"
import { MusicPlayerStopError } from "@cross/errors/musicPlayerStopError"
import { MusicPlayerConnectionError } from "@cross/errors/musicPlayerConnectionError"
import { MusicPlayerJoinVoiceChannelError } from "@cross/errors/musicPlayerJoinVoiceChannelError"
import { MusicPlayerResumeError } from "@cross/errors/musicPlayerResumeError"
import { DiscordBotConnectionBugError } from "@cross/errors/discordBotConnectionBugError"
// types
import { SongInfo } from "@cross/types/database/media"
import { MusicPlayerResponse } from "@cross/types/media/musicPlayer"

const MAX_CONNECTION_ESTABLISHMENT_ATTEMPTS = 3

const SOCKET_CONNECTION_ERROR = "TypeError"

/**
 * The Discord music bot class that handles the music player functionality.
 * The main purpose of this class is to create a connection to voice channel,
 * main logic of playing songs is handled by the MusicQueue class.
 */
export class DiscordMusicBot {
  public client?: Client
  public chanelId: string | null = null
  public guildId: string | null = null
  private queue?: MusicQueue
  private connectionEstablishedCount: number = 0

  constructor() {}

  /**
   * Starts the Discord client with the specified token and optional logging functions.
   *
   * @param token - The token used to log in to the Discord client.
   * @param warnLogFunction - Optional. A function to handle warning logs. If not provided, warnings will be logged to the console.
   * @param errorLogFunction - Optional. A function to handle error logs. If not provided, errors will be logged to the console.
   */
  public startClient(
    token: string,
    chanelId: string,
    guildId: string,
    warnLogFunction?: (info: string) => void,
    errorLogFunction?: (error: Error) => void
  ) {
    try {
      log.info("Starting the Discord client.")
      this.client = new Client({
        intents: [
          GatewayIntentBits.Guilds,
          GatewayIntentBits.GuildVoiceStates,
          GatewayIntentBits.GuildMessages,
          GatewayIntentBits.GuildMessageReactions,
          GatewayIntentBits.MessageContent,
          GatewayIntentBits.DirectMessages
        ]
      })

      this.client.login(token)

      this.client.on("warn", (info) =>
        warnLogFunction ? warnLogFunction(info) : log.warn(info)
      )

      this.client.on("error", (error) =>
        this.handleDiscordClientCrash(error, errorLogFunction)
      )

      this.client.on("voiceStateUpdate", (oldState, newState) => {
        if (newState.channelId != oldState.channelId && !!newState.channelId) {
          this.chanelId = newState.channelId
        }
      })

      this.chanelId = chanelId
      this.guildId = guildId
      if (this.queue) {
        this.queue.stop()
        this.queue = undefined
      }
    } catch (error) {
      this.handleDiscordClientCrash(error, errorLogFunction)
      throw new MusicPlayerUnexpectedError()
    }
  }

  /**
   * Attempts to play a new song. This method handles various connection issues
   * and retries playing the song if necessary. It also ensures that the connection
   * to the voice channel is properly established before playing the song.
   * TODO: it should be refactored to use different play function, not just play single song
   *
   * @param {SongInfo} song - The song information to be played.
   * @returns {Promise<MusicPlayerResponse>} - The status of the music player after attempting to play the song.
   * @throws {MusicPlayerConnectionError} - If the maximum number of connection attempts is exceeded.
   * @throws {DiscordBotConnectionBugError} - If there is a known bug in the Discord library causing a connection error.
   * @throws {Error} - If there are any other unexpected errors.
   */
  public async tryToPlayANewSong(song: SongInfo): Promise<MusicPlayerResponse> {
    this.connectionEstablishedCount++
    if (
      this.connectionEstablishedCount > MAX_CONNECTION_ESTABLISHMENT_ATTEMPTS
    ) {
      this.connectionEstablishedCount = 0
      throw new MusicPlayerConnectionError()
    }
    try {
      const status = await this.playSingleSong(song)
      if (status.status !== MUSIC_PLAYER_STATUS.PLAYING) {
        this.destroyQueueAndConnection()
        return this.tryToPlayANewSong(song)
      }
      // Sometimes there is a some bug in the Discord bot connection.
      // It doesn't throw any error but the connection is not established.
      // So we need to check the connection status besides just queue status.
      let connectionStatus = this.getQueueConnectionStatus()
      if (
        !connectionStatus ||
        connectionStatus.connection === VoiceConnectionStatus.Disconnected
      ) {
        this.destroyQueueAndConnection()
        return this.tryToPlayANewSong(song)
      }
    } catch (error) {
      this.handleErrorLog(error)
      // If there are some unexpected errors, we need to try to play the song again.
      this.destroyQueueAndConnection()
      if (
        this.connectionEstablishedCount ===
        MAX_CONNECTION_ESTABLISHMENT_ATTEMPTS
      ) {
        this.connectionEstablishedCount = 0
        // If it was a last attempt we just throw an error to the caller.
        if (error instanceof Error && error.name === SOCKET_CONNECTION_ERROR) {
          // There is some bug in discord library, that sometimes throw an TypeError
          // when trying to connect to the voice channel.
          throw new DiscordBotConnectionBugError()
        }
        throw error
      }
      return this.tryToPlayANewSong(song)
    }
    // If everything is fine, we reset the connection attempt counter for the next function call
    this.connectionEstablishedCount = 0
    return this.getStatus()
  }

  /**
   * Retrieves the current status of the music player.
   * The player itself doesn't have a status, so it actually returns the status of the queue.
   *
   * @returns {MusicPlayerResponse} The current status of the music player.
   * @throws {MusicPlayerUnexpectedError} If the client is not initialized.
   * @throws {MusicPlayerJoinVoiceChannelError} If the queue is not initialized.
   */
  public getStatus(): MusicPlayerResponse {
    if (!this.client) {
      throw new MusicPlayerUnexpectedError()
    }
    if (!this.queue) {
      throw new MusicPlayerJoinVoiceChannelError()
    }
    return this.queue.getQueueStatus()
  }

  /**
   * Pauses the currently playing song in the queue.
   *
   * @returns {Promise<typeof MUSIC_PLAYER_EMPTY_RESPONSE>} The status of the queue after attempting to pause the song.
   */
  public async pauseSong() {
    await this.prepareQueue()
    // If there is an error on pausing the song, the song will just continue to play.
    // So there is no need to do anything else, and the error will be handled by the function caller.
    if (this.queue) {
      await this.queue.pause()
    }
    return this.getStatus()
  }

  /**
   * Resumes the currently paused song in the queue.
   *
   * @returns {Promise<typeof MUSIC_PLAYER_EMPTY_RESPONSE>} The current status of the music player.
   * @throws {MusicPlayerResumeError} If an error occurs while resuming the song.
   */
  public async resumeSong() {
    await this.prepareQueue()
    try {
      if (this.queue) {
        await this.queue.resume()
      }
      return this.getStatus()
    } catch (error) {
      this.handleErrorLog(error)
      this.destroyQueueAndConnection()
      throw new MusicPlayerResumeError(
        error instanceof Error ? error.message : undefined
      )
    }
  }

  /**
   * Complete stop of the music player.
   * Stops the current song, clears the queue and destroys the connection to the voice channel.
   *
   * @returns {typeof MUSIC_PLAYER_EMPTY_RESPONSE} A constant indicating the music player status is empty.
   */
  public stopSong() {
    this.destroyQueueAndConnection()
    return MUSIC_PLAYER_EMPTY_RESPONSE
  }

  /**
   * Plays a single song by creating queue from it and starting playback.
   *
   * @param song - The song information to be played.
   * @returns A promise that resolves to the current status of the player.
   */
  private async playSingleSong(song: SongInfo) {
    await this.prepareQueue()
    if (this.queue) {
      await this.queue.play([song])
    }
    return this.getStatus()
  }

  /**
   * Prepares the music queue by ensuring the correct voice channel connection.
   *
   * @throws {MusicPlayerStopError} If there is an error while destroying the existing voice connection.
   * @throws {MusicPlayerJoinVoiceChannelError} If there is an error while joining the voice channel.
   */
  private async prepareQueue() {
    if (
      !!this.queue &&
      !!this.chanelId &&
      this.chanelId !== this.queue.connection.joinConfig.channelId
    ) {
      this.destroyQueueAndConnection()
    }
    if (!!this.client && !this.queue && !!this.chanelId && !!this.guildId) {
      const guild = await this.client!.guilds.fetch(this.guildId!)
      if (guild) {
        try {
          const connection = getVoiceConnection(this.guildId)
          if (connection) {
            connection.destroy()
          }
        } catch (error) {
          this.handleErrorLog(error)
          throw new MusicPlayerStopError()
        }
        try {
          this.queue = new MusicQueue({
            connection: joinVoiceChannel({
              channelId: this.chanelId!,
              guildId: this.guildId!,
              adapterCreator: guild.voiceAdapterCreator
            })
          })
        } catch (error) {
          this.handleErrorLog(error)
          throw new MusicPlayerJoinVoiceChannelError()
        }
      }
    }
  }

  /**
   * Clear queue and destroys the connection to the voice channel.
   *
   * @throws {MusicPlayerStopError} If an error occurs while stopping the player or disconnecting the queue.
   */
  private destroyQueueAndConnection() {
    try {
      if (this.queue) {
        // First, stop the queue and disconnect it by the queue object.
        this.queue.stop()
        this.queue.disconnect()
      }
      if (this.guildId) {
        // Additionally, if there are no queue but connection exists, destroy the connection directly.
        const connection = getVoiceConnection(this.guildId)
        if (connection) {
          connection.destroy()
        }
      }
    } catch (error) {
      this.handleErrorLog(error)
      throw new MusicPlayerStopError()
    }
    this.queue = undefined
  }

  /**
   * Retrieves status of the connection and player in the queue.
   */
  private getQueueConnectionStatus() {
    if (this.queue) {
      return this.queue.getConnectionStatus()
    }
    return undefined
  }

  /**
   * Handles the crash of the Discord client by destroying the client instance,
   * resetting the status, and logging the error.
   *
   * @param error - The error that caused the crash, if any.
   * @param errorLogFunction - An optional custom function to log the error.
   */
  private handleDiscordClientCrash(
    error?: Error | unknown,
    errorLogFunction?: (error: Error) => void
  ) {
    this.client?.destroy()
    this.client = undefined
    errorLogFunction ? errorLogFunction(error as Error) : log.error(error)
  }

  /**
   * Handles logging of errors.
   *
   * @param error - The error to be logged. If the error is an instance of `Error`,
   *                its message and stack trace will be logged.
   */
  private handleErrorLog(error: unknown) {
    if (error instanceof Error) {
      log.error(error.message)
      log.error(error.stack)
    }
  }
}
