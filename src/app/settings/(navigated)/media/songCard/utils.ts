import { SONG_CARD_SETTINGS_KEYS } from "@cross/constants/settingsMedia"
import {
  AVAILABLE_SONG_CARD_SETTINGS,
  SONG_CARD_SETTINGS
} from "@cross/types/database/settings/media"

export function formateSettingsFormAfterChange(
  name: AVAILABLE_SONG_CARD_SETTINGS,
  value: string,
  currentSettings: SONG_CARD_SETTINGS | undefined
): SONG_CARD_SETTINGS {
  const formattedSettings = currentSettings ? { ...currentSettings } : {}
  formattedSettings[name] = value
  if (
    name == SONG_CARD_SETTINGS_KEYS.CARD_SHORT_PRIMARY &&
    formattedSettings[SONG_CARD_SETTINGS_KEYS.CARD_SHORT_SECONDARY] == value
  ) {
    formattedSettings[SONG_CARD_SETTINGS_KEYS.CARD_SHORT_SECONDARY] =
      value == "title" ? "comment" : "title"
  }
  if (name == SONG_CARD_SETTINGS_KEYS.CARD_FULL_PRIMARY) {
    formattedSettings[SONG_CARD_SETTINGS_KEYS.CARD_FULL_SECONDARY] =
      value == "title" ? "comment" : "title"
  }
  return formattedSettings
}
