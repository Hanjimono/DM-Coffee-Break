import { AVAILABLE_MEDIA_SOURCES } from "@cross/constants/media"

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
