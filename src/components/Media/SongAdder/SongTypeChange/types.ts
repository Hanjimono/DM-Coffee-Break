import { MEDIA_TYPES } from "@cross/database/constants/media"

export interface SongTypeChangeProps {
  onChange: (type: (typeof MEDIA_TYPES)[keyof typeof MEDIA_TYPES]) => void
}
