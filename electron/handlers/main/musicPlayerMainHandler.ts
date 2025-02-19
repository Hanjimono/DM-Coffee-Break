import { MUSIC_PLAYER_STATUS } from "@cross/constants/musicPlayer"
import { SongInfo } from "@cross/types/database/media"
import { MusicPlayerResponse } from "@cross/types/media/musicPlayer"
import { ipcMain } from "electron"
import { getUserSettingsFromDb } from "./databaseMainHandler"
import { discordMusicBot } from "../../discordMusicBotObject"
import { MEDIA_PLAYER_SETTINGS_BOT_KEYS } from "@cross/constants/settingsMedia"

const DEFAULT_RESPONSE: MusicPlayerResponse = {
  status: MUSIC_PLAYER_STATUS.STOPPED,
  song: undefined,
  error: undefined
}

async function prepareDiscordMusicBot() {
  if (discordMusicBot.status !== undefined) {
    return discordMusicBot
  }
  const settings = await getUserSettingsFromDb()
  discordMusicBot.startClient(
    settings.media.player.bot[MEDIA_PLAYER_SETTINGS_BOT_KEYS.BOT_TOKEN],
    settings.media.player.bot[MEDIA_PLAYER_SETTINGS_BOT_KEYS.BOT_CHANNEL_ID],
    settings.media.player.bot[MEDIA_PLAYER_SETTINGS_BOT_KEYS.BOT_GUILD_ID]
  )
  return discordMusicBot
}

ipcMain.handle("music-player-get-status", async () => {
  const bot = await prepareDiscordMusicBot()
  return bot.getStatus()
})

ipcMain.handle("music-player-play", async (event, song: SongInfo) => {
  const bot = await prepareDiscordMusicBot()
  return bot.playSong(song)
})

ipcMain.handle("music-player-resume", async () => {
  const bot = await prepareDiscordMusicBot()
  return bot.resumeSong()
})

ipcMain.handle("music-player-pause", async () => {
  const bot = await prepareDiscordMusicBot()
  return bot.pauseSong()
})

ipcMain.handle("music-player-stop", async () => {
  const bot = await prepareDiscordMusicBot()
  return bot.stopSong()
})
