import { MUSIC_PLAYER_STATUS } from "@cross/constants/musicPlayer"
import { SongInfo } from "@cross/types/database/media"

export type MusicPlayerAvailableStatus =
  (typeof MUSIC_PLAYER_STATUS)[keyof typeof MUSIC_PLAYER_STATUS]

export interface MusicPlayerResponse {
  status: MusicPlayerAvailableStatus
  song?: SongInfo
  currentSongIndex?: number
  queue?: SongInfo[]
  error?: {
    message: string
    details?: string
  }
}
