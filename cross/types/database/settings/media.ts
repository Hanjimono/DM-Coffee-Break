import { SONG_CARD_SETTINGS_KEYS } from "@cross/constants/settingsMedia"

export type AVAILABLE_SONG_CARD_SETTINGS =
  (typeof SONG_CARD_SETTINGS_KEYS)[keyof typeof SONG_CARD_SETTINGS_KEYS]

export type SONG_CARD_SETTINGS = Partial<
  Record<AVAILABLE_SONG_CARD_SETTINGS, string>
>
