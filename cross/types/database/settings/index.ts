import { DatabaseVersion } from "./version"
import { AVAILABLE_SONG_CARD_SETTINGS } from "./media"

export interface UserSettings {
  main: {
    version: DatabaseVersion
  }
  media: {
    songCard: Record<AVAILABLE_SONG_CARD_SETTINGS, string>
  }
}
