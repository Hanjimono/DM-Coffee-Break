import { ipcRenderer } from "electron"
import { SongParserHandler } from "@cross/types/handlers/songParser"
import { SONG_PARSER_IPC_CHANNELS } from "@cross/constants/ipc"

export const songParserRendererHandler: SongParserHandler = {
  parseSongInfo: async (data) =>
    ipcRenderer.invoke(SONG_PARSER_IPC_CHANNELS.PARSE_SONG_INFO, data)
}
