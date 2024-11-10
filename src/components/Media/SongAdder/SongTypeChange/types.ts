import { AVAILABLE_MEDIA_TYPE } from "@cross/types/media/song"

export interface SongTypeChangeProps {
  onChange: (type: AVAILABLE_MEDIA_TYPE) => void
}
