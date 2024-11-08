import { ParsedSongInfo, SongToParseData } from "@cross/types/media/song"

export interface SongParserHandler {
  parseSongInfo: (data: SongToParseData) => Promise<ParsedSongInfo>
}
