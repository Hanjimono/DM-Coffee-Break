import {
  AvailableSettingsCategories,
  UserSettings
} from "@cross/types/database/settings"
import { RendererHandler } from "./main"

interface SettingSetDTO {
  key: string
  value: string
  category?: AvailableSettingsCategories
}

/**
 * Handler for settings operations with the database
 */
export interface SettingsHandler {
  /**
   * Get all of the user settings from the database
   */
  get: RendererHandler<() => Promise<UserSettings>>

  /**
   * Save or Edit setting in the database via key-value pair
   */
  set: RendererHandler<(arg: SettingSetDTO) => Promise<boolean>>
}
