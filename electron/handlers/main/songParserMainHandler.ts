import { parseSongInfo } from "../../songParser"
import { SONG_PARSER_IPC_CHANNELS } from "@cross/constants/ipc"
import { handleIpcMain } from "./main"
import { SongParserHandler } from "@cross/types/handlers/songParser"

/**
 * Run the song parser to parse the song info
 */
handleIpcMain<SongParserHandler["parseSongInfo"]>(
  SONG_PARSER_IPC_CHANNELS.PARSE_SONG_INFO,
  async (event, data) => {
    return await parseSongInfo(data)
  }
)
