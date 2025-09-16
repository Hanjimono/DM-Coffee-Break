import {
  AvailableSettingsCategories,
  UserSettings,
  UserSettingsDomain
} from "@cross/types/database/settings"
import { SongCardSettingsHandler } from "./songCardSettings"

/**
 * Handler for settings operations with the database
 */
export interface SettingsHandler {
  /**
   * @deprecated use getDomain instead
   * Get all of the user settings from the database
   */
  get: () => Promise<UserSettings>

  /**
   * Get all of the user settings from the database
   */
  getDomain: () => Promise<UserSettingsDomain>

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
  songCard: SongCardSettingsHandler
}
