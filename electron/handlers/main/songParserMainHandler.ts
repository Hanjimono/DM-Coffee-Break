import { ipcMain } from "electron"
import { parseSongInfo } from "../../songParser"

/**
 * Run the song parser to parse the song info
 */
ipcMain.handle("song-parser-parse-song-info", async (event, data) => {
  return await parseSongInfo(data)
})
