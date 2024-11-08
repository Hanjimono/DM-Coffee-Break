import { ipcMain } from "electron"
import { parseSongInfo } from "../../songParser"

ipcMain.handle("song-parser-parse-song-info", async (event, data) => {
  return await parseSongInfo(data)
})
