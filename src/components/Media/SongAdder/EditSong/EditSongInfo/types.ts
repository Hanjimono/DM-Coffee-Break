import { SongInfo } from "@cross/types/database/media"

export interface EditSongInfoProps {
  /** Classes */
  className?: string
  handleCancelClick?: () => void
  cancelLink?: string
  defaultValues?: SongInfo
}
