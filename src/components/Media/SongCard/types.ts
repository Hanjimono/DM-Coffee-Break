import { SongInfo } from "@cross/types/database/media"

export type SongCardType = "short" | "full" | "tooltip"

export interface SongCardProps {
  /** Classes */
  className?: string
  info: SongInfo
  isEdit?: boolean
  isShowEdit?: boolean
  onRemove?: () => void
  type?: SongCardType
  isHideTags?: boolean
}
