import { SongInfo } from "@cross/types/media/song"

export interface EditSongInfoProps {
  /** Classes */
  className?: string
  handleCancelClick?: () => void
  cancelLink?: string
  defaultValues?: SongInfo
}
