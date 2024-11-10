import { DatabaseVersion } from "@cross/types/database/settings/version"
import { SETTINGS_HANDLER } from "./settings"

/**
 * Interface representing a handler for database operations.
 */
export interface DatabaseHandler {
  /**
   * Authenticates the database connection.
   *
   * @returns A promise that resolves to a boolean indicating whether the authentication was successful.
   */
  authenticate: () => Promise<boolean>

  /**
   * Checks if the database version matches the provided version.
   *
   * @param lastVersion - The last known version of the database.
   * @returns A promise that resolves to a boolean indicating whether the version matches.
   */
  checkVersion: (lastVersion: DatabaseVersion) => Promise<boolean>

  /**
   * Synchronizes the database to the latest version.
   * Applies all necessary migrations to update the database to the latest version.
   *
   * @param lastVersion - The last known version of the database.
   * @returns A promise that resolves to the new version of the database.
   */
  sync: (lastVersion: DatabaseVersion) => Promise<DatabaseVersion>

  /**
   * Retrieves the current version of the database.
   *
   * @returns A promise that resolves to the current version of the database.
   */
  getVersion: () => Promise<DatabaseVersion>

  settings: SETTINGS_HANDLER
}
