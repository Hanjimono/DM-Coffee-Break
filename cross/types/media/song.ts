import { MEDIA_SOURCES, MEDIA_TYPES } from "@cross/constants/media"

export type AvailableMediaSources =
  (typeof MEDIA_SOURCES)[keyof typeof MEDIA_SOURCES]

export type AvailableMediaTypes = (typeof MEDIA_TYPES)[keyof typeof MEDIA_TYPES]

export interface SongToParseData {
  url: string
  source?: AvailableMediaSources
}

/**
 * Info returned by the parser after successfully parsing a song from a web source
 */
export interface ParsedSongInfo {
  title?: string
  artist?: string
  duration?: number
  thumbnail?: string
  url: string
  source: AvailableMediaSources
}
