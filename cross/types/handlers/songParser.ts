import { ParsedSongInfo, SongToParseData } from "@cross/types/media/song"

/**
 * Handler for parsing songs from different web sources
 */
export interface SongParserHandler {
  /**
   * Parse song info from a given URL
   * @param data Data to parse song info from
   * @returns Parsed song info
   */
  parseSongInfo: (data: SongToParseData) => Promise<ParsedSongInfo>
}
