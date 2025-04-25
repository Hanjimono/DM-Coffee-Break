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

export interface SongViewProps extends SongCardProps {
  onPlay?: () => void
  onEdit?: () => void
  onDelete?: () => void
  /** Indicates whether to show detailed info and actions */
  isOnlyBaseInfo?: boolean
  /** Indicates whether to remove a background */
  isTransparent?: boolean
}

/** Displays a thumbnail of the song, with an optional play button. */
export interface SongThumbnailViewProps {
  alt: string
  /** The source URL of the thumbnail image */
  thumbnail?: string
  className?: string
  /** Callback function triggered when the play button is clicked */
  onPlay?: () => void
}

/** Displays duration and the actions available for a song, such as edit and delete. */
export interface SongActionsViewProps {
  className?: string
  /** The duration of the song in seconds */
  duration?: number
  /** Callback function triggered when the delete action is clicked */
  onEdit?: () => void
  /** Callback function triggered when the edit action is clicked */
  onDelete?: () => void
}

/** Displays detailed information about a song, including its title, artist, description, and tags. */
export interface SongDetailsViewProps {
  className?: string
  /** Information about the song */
  info: SongInfo
  /** Indicates whether to show the title in the details view */
  isShowTitleInDetails?: boolean
}

export interface ActiveSongCardProps extends SongCardProps {}
