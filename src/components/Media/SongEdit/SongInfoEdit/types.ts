import { SongInfo } from "@cross/types/database/media"

/** Props for the SongInfoEdit component */
export interface SongInfoEditProps {
  /** Existing song info for edit mode */
  songInfo: SongInfo | null
  /** Callback function to handle song info save */
  onSave?: (songInfo: SongInfo) => void
  /** Callback function to handle song URL change */
  onChangeLink?: () => void
}
