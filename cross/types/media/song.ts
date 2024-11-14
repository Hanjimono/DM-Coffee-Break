import { MEDIA_SOURCES, MEDIA_TYPES } from "@cross/constants/media"

export type AVAILABLE_MEDIA_SOURCES =
  (typeof MEDIA_SOURCES)[keyof typeof MEDIA_SOURCES]

export type AVAILABLE_MEDIA_TYPE =
  (typeof MEDIA_TYPES)[keyof typeof MEDIA_TYPES]

export interface SongToParseData {
  url: string
  source?: AVAILABLE_MEDIA_SOURCES
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
  source: AVAILABLE_MEDIA_SOURCES
}

/**
 * Formatted for operating in application song data
 * that is stored in the database via different tables.
 */
export interface SongInfo {
  title: string
  artist?: string
  /** Song duration in seconds */
  duration?: number
  thumbnail?: string
  url: string
  comment?: string
  /** List of tag ids */
  tags?: number[]
  source: AVAILABLE_MEDIA_SOURCES
  /** Id of category saved in the database */
  categoryId?: number
}
