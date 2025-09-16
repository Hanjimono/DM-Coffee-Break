import { DatabaseVersion } from "@cross/types/database/settings/version"
import { SettingsRepository } from "../repositories/SettingsRepository"
import { BaseService } from "./BaseService"
import {
  DEFAULT_USER_SETTINGS,
  DEFAULT_USER_SETTINGS_DOMAIN,
  USER_SETTINGS_DB_MAPPER
} from "@cross/constants/settings"
import {
  UserSettings,
  UserSettingsDomain
} from "@cross/types/database/settings"
import Logger from "electron-log/main"

export class SettingsService extends BaseService {
  constructor(private settingsRepository: SettingsRepository) {
    super()
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

  @BaseService.logErrors(DEFAULT_USER_SETTINGS_DOMAIN)
  /**
   * Retrieves the user settings by merging default settings with values from the database.
   *
   * This method clones the default user settings and then overrides specific properties
   * based on the key-value pairs retrieved from the database. The mapping between database
   * keys and settings object paths is defined by `USER_SETTINGS_DB_MAPPER`. For each database
   * row, the corresponding property in the settings object is updated.
   *
   * @returns {Promise<UserSettingsDomain>} A promise that resolves to the merged user settings.
   */
  async getUserSettings(): Promise<UserSettingsDomain> {
    let settings = { ...DEFAULT_USER_SETTINGS_DOMAIN }
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
      current[parts[parts.length - 1]] = row.value
    }
    return settings
  }
}
