import { MEDIA_PLAYER_TYPES } from "@cross/constants/media"
import {
  MEDIA_PLAYER_SETTINGS_CLIPBOARD_KEYS,
  SONG_CARD_SETTINGS_KEYS
} from "@cross/constants/settingsMedia"

export type AVAILABLE_SONG_CARD_SETTINGS =
  (typeof SONG_CARD_SETTINGS_KEYS)[keyof typeof SONG_CARD_SETTINGS_KEYS]

export type SONG_CARD_SETTINGS = Partial<
  Record<AVAILABLE_SONG_CARD_SETTINGS, string>
>

export type AVAILABLE_MEDIA_PLAYER_TYPES =
  (typeof MEDIA_PLAYER_TYPES)[keyof typeof MEDIA_PLAYER_TYPES]

export type AVAILABLE_MEDIA_PLAYER_SETTINGS_CLIPBOARD_KEYS =
  (typeof MEDIA_PLAYER_SETTINGS_CLIPBOARD_KEYS)[keyof typeof MEDIA_PLAYER_SETTINGS_CLIPBOARD_KEYS]
