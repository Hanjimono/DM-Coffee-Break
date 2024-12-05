import {
  AvailableSettingsCategories,
  UserSettings
} from "@cross/types/database/settings"
import { SONG_CARD_SETTINGS_HANDLER } from "./songCardSettings"

/**
 * Handler for settings operations with the database
 */
export interface SETTINGS_HANDLER {
  /**
   * Get all of the user settings from the database
   */
  get: () => Promise<UserSettings>

  /**
   * Save or Edit setting in the database via key-value pair
   */
  set: (
    key: string,
    value: string,
    category?: AvailableSettingsCategories
  ) => Promise<boolean>

  /**
   * Handler for song card settings operations with the database
   */
  songCard: SONG_CARD_SETTINGS_HANDLER
}
