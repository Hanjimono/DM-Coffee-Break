// system
import log from "electron-log/main"
// logic
import { discordMusicBot } from "../../discordMusicBotObject"
import { getUserSettingsFromDb } from "./databaseMainHandler"
// errors
import { MusicPlayerUnexpectedError } from "@cross/errors/musicPlayerUnexpectedError"
import { MusicPlayerBaseError } from "@cross/errors/musicPlayerBaseError"
// constants
import { MEDIA_PLAYER_SETTINGS_BOT_KEYS } from "@cross/constants/settingsMedia"
// types
import { SongInfo } from "@cross/types/database/media"
import { handleIpcMain } from "./main"
import { MusicPlayerHandler } from "@cross/types/handlers/musicPlayer"
import { MUSIC_IPC_CHANNELS } from "@cross/constants/ipc"

/**
 * Prepares the Discord music bot by initializing it with user settings from the database.
 * If the bot is already initialized, it returns the existing instance.
 *
 * @returns {Promise<DiscordMusicBot>} The initialized Discord music bot instance.
 * @throws {MusicPlayerUnexpectedError} If an error occurs during the bot initialization.
 */
async function prepareDiscordMusicBot() {
  try {
    if (discordMusicBot.client !== undefined) {
      return discordMusicBot
    }
    const settings = await getUserSettingsFromDb()
    discordMusicBot.startClient(
      settings.media.player.bot[MEDIA_PLAYER_SETTINGS_BOT_KEYS.BOT_TOKEN],
      settings.media.player.bot[MEDIA_PLAYER_SETTINGS_BOT_KEYS.BOT_CHANNEL_ID],
      settings.media.player.bot[MEDIA_PLAYER_SETTINGS_BOT_KEYS.BOT_GUILD_ID]
    )
    return discordMusicBot
  } catch (error) {
    throw new MusicPlayerUnexpectedError()
  }
}

/**
 * Handles errors that occur in the Discord music bot. It logs an error message
 * and returns a formatted error response.
 *
 * @param error - The error that occurred. This can be of any type.
 * @returns A formatted error response.
 */
const handleDiscordMusicBotError = (error: unknown) => {
  let formattedError = new MusicPlayerUnexpectedError()
  if (error instanceof MusicPlayerBaseError) {
    formattedError = error
  }
  log.error(formattedError.message)
  if (formattedError.stack) {
    log.error("error stack: ", formattedError.stack)
  }
  return formattedError.getResponse()
}

handleIpcMain<MusicPlayerHandler["getStatus"]>(
  MUSIC_IPC_CHANNELS.GET_STATUS,
  async () => {
    try {
      const bot = await prepareDiscordMusicBot()
      return bot.getStatus()
    } catch (error) {
      return handleDiscordMusicBotError(error)
    }
  }
)

handleIpcMain<MusicPlayerHandler["play"]>(
  MUSIC_IPC_CHANNELS.PLAY,
  async (event, song: SongInfo) => {
    try {
      const bot = await prepareDiscordMusicBot()
      return bot.tryToPlayANewSong(song)
    } catch (error) {
      return handleDiscordMusicBotError(error)
    }
  }
)

handleIpcMain<MusicPlayerHandler["resume"]>(
  MUSIC_IPC_CHANNELS.RESUME,
  async () => {
    try {
      const bot = await prepareDiscordMusicBot()
      return bot.resumeSong()
    } catch (error) {
      return handleDiscordMusicBotError(error)
    }
  }
)

handleIpcMain<MusicPlayerHandler["pause"]>(
  MUSIC_IPC_CHANNELS.PAUSE,
  async () => {
    try {
      const bot = await prepareDiscordMusicBot()
      return bot.pauseSong()
    } catch (error) {
      return handleDiscordMusicBotError(error)
    }
  }
)

handleIpcMain<MusicPlayerHandler["stop"]>(MUSIC_IPC_CHANNELS.STOP, async () => {
  try {
    const bot = await prepareDiscordMusicBot()
    return bot.stopSong()
  } catch (error) {
    return handleDiscordMusicBotError(error)
  }
})
