import { SongInfo } from "../database/media"

export interface MediaCategory {
  id?: number
  title: string
  hex?: string
  songsCount: number
  songs: SongInfo[]
}
