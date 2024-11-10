import { MEDIA_SOURCES, MEDIA_TYPES } from "@cross/constants/media"

export type AVAILABLE_MEDIA_SOURCES =
  (typeof MEDIA_SOURCES)[keyof typeof MEDIA_SOURCES]

export type AVAILABLE_MEDIA_TYPE =
  (typeof MEDIA_TYPES)[keyof typeof MEDIA_TYPES]

export interface SongToParseData {
  url: string
  source?: AVAILABLE_MEDIA_SOURCES
}

export interface ParsedSongInfo {
  title?: string
  artist?: string
  duration?: number
  thumbnail?: string
  url: string
  source: AVAILABLE_MEDIA_SOURCES
}

export interface SongInfo {
  title: string
  artist?: string
  duration?: number
  thumbnail?: string
  url: string
  comment?: string
  tags?: number[]
  source: AVAILABLE_MEDIA_SOURCES
  categoryId?: number
}
