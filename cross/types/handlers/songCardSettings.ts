import {
  AVAILABLE_SONG_CARD_SETTINGS,
  SONG_CARD_SETTINGS
} from "../database/settings/media"

export interface SONG_CARD_SETTINGS_HANDLER {
  get: () => Promise<SONG_CARD_SETTINGS>
  set: (settings: SONG_CARD_SETTINGS) => Promise<boolean>
  setOne: (key: AVAILABLE_SONG_CARD_SETTINGS, value: string) => Promise<boolean>
}
