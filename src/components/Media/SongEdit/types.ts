import { SongInfo } from "@cross/types/database/media"

/**
 * Props for SongEdit component
 */
export interface SongEditProps {
  /** Existing song info for edit mode */
  songInfo?: SongInfo
  /** Flag indicating if the component is in parse mode */
  isParseMode?: boolean
}
