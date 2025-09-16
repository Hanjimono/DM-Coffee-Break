import { DatabaseVersion } from "@cross/types/database/settings/version"
import { SettingsRepository } from "../repositories/SettingsRepository"
import { BaseService } from "./BaseService"

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
}
