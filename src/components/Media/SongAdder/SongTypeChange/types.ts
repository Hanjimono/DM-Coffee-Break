import { AvailableMediaTypes } from "@cross/types/media/song"

export interface SongTypeChangeProps {
  onChange: (type: AvailableMediaTypes) => void
}
