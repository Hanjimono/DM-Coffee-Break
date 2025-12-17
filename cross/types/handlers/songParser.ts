import { ParsedSongInfo, SongToParseData } from "@cross/types/media/song"
import { RendererHandler } from "./main"

interface SongToParseDTO extends SongToParseData {}

/**
 * Handler for parsing songs from different web sources
 */
export interface SongParserHandler {
  /**
   * Parse song info from a given URL
   * @returns Parsed song info
   */
  parseSongInfo: RendererHandler<
    (data: SongToParseDTO) => Promise<ParsedSongInfo>
  >
}
