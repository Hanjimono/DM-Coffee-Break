import { AVAILABLE_MEDIA_TYPE } from "@cross/constants/media"

export interface SongTypeChangeProps {
  onChange: (type: AVAILABLE_MEDIA_TYPE) => void
}
