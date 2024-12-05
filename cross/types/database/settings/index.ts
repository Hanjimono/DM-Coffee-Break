import { DatabaseVersion } from "./version"
import {
  AVAILABLE_MEDIA_PLAYER_SETTINGS_CLIPBOARD_KEYS,
  AVAILABLE_MEDIA_PLAYER_TYPES,
  AVAILABLE_SONG_CARD_SETTINGS
} from "./media"
import { SETTINGS_CATEGORIES } from "@cross/constants/settingsCategories"

export interface UserSettings {
  main: {
    version: DatabaseVersion
  }
  media: {
    songCard: Record<AVAILABLE_SONG_CARD_SETTINGS, string>
    player: {
      type: AVAILABLE_MEDIA_PLAYER_TYPES
      api: {}
      clipboard: Record<AVAILABLE_MEDIA_PLAYER_SETTINGS_CLIPBOARD_KEYS, string>
      bot: {}
    }
  }
}

export type AvailableSettingsCategories =
  (typeof SETTINGS_CATEGORIES)[keyof typeof SETTINGS_CATEGORIES]
