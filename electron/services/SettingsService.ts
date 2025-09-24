// system
import Logger from "electron-log/main"
// services
import { BaseService } from "./BaseService"
// constants
import {
  DEFAULT_USER_SETTINGS,
  USER_SETTINGS_DB_MAPPER
} from "@cross/constants/settings"
import { SETTINGS_CATEGORIES } from "@cross/constants/settingsCategories"
// repositories
import { SettingsRepository } from "../repositories/SettingsRepository"
// types
import { DatabaseVersion } from "@cross/types/database/settings/version"
import {
  AvailableSettingsCategories,
  UserSettings
} from "@cross/types/database/settings"

/**
 * Business logic for managing application settings.
 */
export class SettingsService extends BaseService {
  constructor(private settingsRepository: SettingsRepository) {
    super()
  }

  @BaseService.logErrors(false)
  /**
   * Retrieves the current database version from the settings.
   */
  async getCurrentDatabaseVersion(): Promise<DatabaseVersion> {
    const currentVersionSetting =
      await this.settingsRepository.getCurrentDatabaseVersion()
    return (currentVersionSetting?.value as DatabaseVersion) ?? "0.0.0"
  }

  @BaseService.logErrors(false)
  /**
   * Checks if the current database version matches the specified last version.
   *
   * @param lastVersion - The version to compare against the current database version.
   * @returns A promise that resolves to `true` if the current version matches `lastVersion`, otherwise `false`.
   */
  async checkDatabaseVersion(lastVersion: DatabaseVersion): Promise<boolean> {
    const currentVersionSetting =
      await this.settingsRepository.getCurrentDatabaseVersion()
    const currentVersion: DatabaseVersion =
      (currentVersionSetting?.value as DatabaseVersion) ?? "0.0.0"
    return currentVersion === lastVersion
  }

  @BaseService.logErrors(false)
  /**
   * Saves a new database version if it does not already exist.
   *
   * Checks if the provided database version is already present using `checkDatabaseVersion`.
   * If the version exists, the method returns `true` without saving.
   * Otherwise, it saves the new database version using the repository and returns `true`.
   *
   * @param version - The database version to be saved.
   * @returns A promise that resolves to `true` if the version was saved or already exists, or `false` if an error occurred.
   */
  async saveNewDatabaseVersion(version: DatabaseVersion) {
    if (await this.checkDatabaseVersion(version)) {
      return true
    }
    await this.settingsRepository.saveNewDatabaseVersion(version)
    return true
  }

  @BaseService.logErrors(DEFAULT_USER_SETTINGS)
  /**
   * Retrieves the user settings by merging default settings with values from the database.
   *
   * This method clones the default user settings and then overrides specific properties
   * based on the key-value pairs retrieved from the database. The mapping between database
   * keys and settings object paths is defined by `USER_SETTINGS_DB_MAPPER`. For each database
   * row, the corresponding property in the settings object is updated.
   *
   * @returns {Promise<UserSettings>} A promise that resolves to the merged user settings.
   */
  async getUserSettings(): Promise<UserSettings> {
    let settings = { ...DEFAULT_USER_SETTINGS }
    // Fetch all relevant settings from the database
    const dbSettings = await this.settingsRepository.getBaseUserSettings()
    for (const row of dbSettings) {
      // Find the corresponding path in the settings object
      const path = USER_SETTINGS_DB_MAPPER[row.key]
      if (!path) continue

      // Navigate to the correct location in the settings object and update the value
      const parts = path.split(".")
      let current: any = settings
      for (let i = 0; i < parts.length - 1; i++) {
        current = current[parts[i]]
      }
      const key = parts[parts.length - 1]
      let value: any = row.value

      // Try to infer type from default settings
      const defaultValue = current[key]
      if (typeof defaultValue === "boolean") {
        value = row.value === "true"
      } else if (typeof defaultValue === "number") {
        value = parseFloat(row.value)
      }

      current[key] = value
    }
    return settings
  }

  @BaseService.logErrors(false)
  /**
   * Save a user setting in the database.
   *
   * @param key - The key of the setting to update.
   * @param value - The new value for the setting.
   * @param category - The category of the setting.
   * @returns A promise that resolves to `true` if the setting was saved successfully, or `false` if an error occurred.
   */
  async setUserSettings(
    key: string,
    value: string,
    category: AvailableSettingsCategories = SETTINGS_CATEGORIES.GENERAL
  ): Promise<boolean> {
    return await this.settingsRepository.saveSetting(key, value, category)
  }
}
