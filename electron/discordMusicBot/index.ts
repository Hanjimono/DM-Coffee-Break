import { MUSIC_PLAYER_STATUS } from "@cross/constants/musicPlayer"
import { SongInfo } from "@cross/types/database/media"
import {
  MusicPlayerAvailableStatus,
  MusicPlayerResponse
} from "@cross/types/media/musicPlayer"
import { Client, GatewayIntentBits, Guild } from "discord.js"
import { MusicQueue } from "./musicQueue"
import {
  AudioPlayerStatus,
  getVoiceConnection,
  joinVoiceChannel,
  VoiceConnectionStatus
} from "@discordjs/voice"

const MAX_CONNECTION_ESTABLISHMENT_ATTEMPTS = 3

const SOCKET_CONNECTION_ERROR = "TypeError"
export class DiscordMusicBot {
  protected client?: Client
  public status?: MusicPlayerAvailableStatus
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
        warnLogFunction ? warnLogFunction(info) : console.log(info)
      )

      this.client.on("error", (error) =>
        this.handleDiscordClientCrash(error, errorLogFunction)
      )

      this.client.on("voiceStateUpdate", (oldState, newState) => {
        if (newState.channelId != oldState.channelId && !!newState.channelId) {
          this.chanelId = newState.channelId
        }
      })

      this.status = MUSIC_PLAYER_STATUS.EMPTY
      this.chanelId = chanelId
      this.guildId = guildId
      if (this.queue) {
        this.queue.stop()
        this.queue = undefined
      }
    } catch (error) {
      this.handleDiscordClientCrash(error, errorLogFunction)
    }
    return this.getStatus()
  }

  public async prepareQueue() {
    if (
      !!this.queue &&
      !!this.chanelId &&
      this.chanelId !== this.queue.connection.joinConfig.channelId
    ) {
      this.queue.disconnect()
      this.queue = undefined
    }
    if (!!this.client && !this.queue && !!this.chanelId && !!this.guildId) {
      const guild = await this.client!.guilds.fetch(this.guildId!)
      if (guild) {
        const connection = getVoiceConnection(this.guildId)
        if (connection) {
          connection.destroy()
        }
        this.queue = new MusicQueue({
          connection: joinVoiceChannel({
            channelId: this.chanelId!,
            guildId: this.guildId!,
            adapterCreator: guild.voiceAdapterCreator
          })
        })
      }
    }
  }

  public async tryToPlayANewSong(song: SongInfo): Promise<MusicPlayerResponse> {
    this.connectionEstablishedCount++
    if (
      this.connectionEstablishedCount > MAX_CONNECTION_ESTABLISHMENT_ATTEMPTS
    ) {
      this.connectionEstablishedCount = 0
      return this.getStatus("Failed to establish connection.")
    }
    try {
      const status = await this.playSong(song)
      if (status.status !== MUSIC_PLAYER_STATUS.PLAYING) {
        await this.stopSong()
        return this.tryToPlayANewSong(song)
      }
      let connectionStatus = this.getQueueConnectionStatus()
      if (
        !connectionStatus ||
        connectionStatus.connection === VoiceConnectionStatus.Disconnected
      ) {
        await this.stopSong()
        return this.tryToPlayANewSong(song)
      }
      if (connectionStatus.player === AudioPlayerStatus.Buffering) {
        await new Promise((resolve) => setTimeout(resolve, 500))
      }
    } catch (error) {
      if (
        this.connectionEstablishedCount ===
        MAX_CONNECTION_ESTABLISHMENT_ATTEMPTS
      ) {
        this.connectionEstablishedCount = 0
        const errorMessage =
          error instanceof Error ? error.message : "Unexpected error."
        if (error instanceof Error && error.name === SOCKET_CONNECTION_ERROR) {
          console.log(
            "🚀 -----------------------------------------------------------------🚀"
          )
          console.log(
            "🚀 ~ DiscordMusicBot ~ tryToPlayANewSong ~ error.name:",
            error.name
          )
          console.log(
            "🚀 -----------------------------------------------------------------🚀"
          )
          await this.stopSong()
          await new Promise((resolve) => setTimeout(resolve, 1000))
          return this.tryToPlayANewSong(song)
        }
        return this.getStatus(errorMessage)
      }
      await this.stopSong()
      return this.tryToPlayANewSong(song)
    }
    this.connectionEstablishedCount = 0
    return this.getStatus()
  }

  public async playSong(song: SongInfo) {
    await this.prepareQueue()
    if (this.queue) {
      await this.queue.play([song])
    }
    return this.getStatus()
  }

  public async pauseSong() {
    try {
      await this.prepareQueue()
      if (this.queue) {
        await this.queue.pause()
      }
      return this.getStatus()
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unexpected error."
      return this.getStatus(errorMessage)
    }
  }

  public async resumeSong() {
    try {
      await this.prepareQueue()
      if (this.queue) {
        await this.queue.resume()
      }
      return this.getStatus()
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unexpected error."
      return this.getStatus(errorMessage)
    }
  }

  public async stopSong() {
    try {
      await this.prepareQueue()
      if (this.queue) {
        this.queue.stop()
        this.queue.disconnect()
        this.queue = undefined
      }
      return {
        status: MUSIC_PLAYER_STATUS.EMPTY,
        song: null,
        queue: [],
        currentSongIndex: undefined
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unexpected error."
      return this.getStatus(errorMessage)
    }
  }

  public getStatus(errorMessage?: string): MusicPlayerResponse {
    if (errorMessage) {
      return {
        status: MUSIC_PLAYER_STATUS.ERROR,
        error: {
          message: errorMessage
        }
      }
    }
    if (!this.client) {
      return {
        status: MUSIC_PLAYER_STATUS.ERROR,
        error: {
          message: "The Discord client is not available."
        }
      }
    }
    if (!this.queue) {
      return {
        status: MUSIC_PLAYER_STATUS.ERROR,
        error: {
          message: "Failed to connect to the server with voice channel."
        }
      }
    }
    return this.queue.getQueueStatus()
  }

  private getQueueConnectionStatus() {
    if (this.queue) {
      return this.queue.getConnectionStatus()
    }
    return undefined
  }

  private handleDiscordClientCrash(
    error?: Error | unknown,
    errorLogFunction?: (error: Error) => void
  ) {
    this.client?.destroy()
    this.status = undefined
    this.client = undefined
    errorLogFunction ? errorLogFunction(error as Error) : console.error(error)
  }
}
