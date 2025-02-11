import { MUSIC_PLAYER_STATUS } from "@cross/constants/musicPlayer"
import { SongInfo } from "@cross/types/database/media"
import { MusicPlayerResponse } from "@cross/types/media/musicPlayer"
import { ipcMain } from "electron"

const DEFAULT_RESPONSE: MusicPlayerResponse = {
  status: MUSIC_PLAYER_STATUS.STOPPED,
  song: undefined,
  error: undefined
}

ipcMain.handle("music-player-get-status", async () => {
  let response = { ...DEFAULT_RESPONSE }
  response.error = {
    message: "The music player is not available."
  }
  return response
})

ipcMain.handle("music-player-play", async (event, song: SongInfo) => {})

ipcMain.handle("music-player-resume", async () => {})

ipcMain.handle("music-player-pause", async () => {})

ipcMain.handle("music-player-stop", async () => {})
