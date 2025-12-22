import {
  AvailableSettingsCategories,
  UserSettings
} from "@cross/types/database/settings"
import { RendererHandler } from "./main"

/**
 * Data Transfer Object for changing a setting
 */
export interface SettingChangeDTO {
  key: string
  value: string | number | boolean
  category?: AvailableSettingsCategories
}

/**
 * Data Transfer Object for change settings handler
 */
export interface SettingSetDTO {
  settings: SettingChangeDTO[]
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
