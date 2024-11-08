import { ipcRenderer } from "electron"
import { SongParserHandler } from "@cross/types/handlers/songParser"

export const songParserRendererHandler: SongParserHandler = {
  parseSongInfo: async (data) =>
    ipcRenderer.invoke("song-parser-parse-song-info", data)
}
