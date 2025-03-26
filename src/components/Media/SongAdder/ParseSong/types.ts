// Types
import {
  AvailableMediaSources,
  AvailableMediaTypes
} from "@cross/types/media/song"

export interface ParseSongProps {
  type: AvailableMediaTypes
}

export interface SelectSongProps {
  url: string
  onUrlChange: (url: string) => void
  parseSong: (url: string, source?: AvailableMediaSources) => void
  loading?: boolean
  disabled?: boolean
}
