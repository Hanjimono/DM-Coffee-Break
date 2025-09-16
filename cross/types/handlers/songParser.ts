import { ParsedSongInfo, SongToParseData } from "@cross/types/media/song"
import { RendererHandler } from "./main"

/**
 * Handler for parsing songs from different web sources
 */
export interface SongParserHandler {
  /**
   * Parse song info from a given URL
   * @param data Data to parse song info from
   * @returns Parsed song info
   */
  parseSongInfo: RendererHandler<
    (data: SongToParseData) => Promise<ParsedSongInfo>
  >
}
