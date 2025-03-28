import { AvailableMediaSources } from "../media/song"

/**
 * Formatted for operating in application song data
 * that is stored in the database via different tables.
 */
export interface SongInfo {
  id?: number
  title: string
  artist?: string
  /** Song duration in seconds */
  duration?: number
  thumbnail?: string
  url: string
  comment?: string
  /** List of tag ids */
  tags?: number[]
  source: AvailableMediaSources
  /** Id of category saved in the database */
  categoryId?: number
}
