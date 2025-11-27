import { ShortSongInfo } from "../database/media"

/**
 * Data Transfer Object for saving a media category.
 */
export interface SaveMediaCategoryDTO {
  id?: number
  title: string
  hex?: string
}

/**
 * Media category with basic associated songs information.
 */
export interface MediaCategoryWithSongsInfo {
  id?: number
  title: string
  hex?: string
  songsCount: number
  songs: ShortSongInfo[]
}
