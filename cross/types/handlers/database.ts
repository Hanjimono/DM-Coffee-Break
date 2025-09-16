import { DatabaseVersion } from "@cross/types/database/settings/version"
import { SettingsHandler } from "./settings"
import { MediaHandler } from "./media"
import { DictionaryHandler } from "./dictionary"
import { TagHandler } from "./tag"
import { RendererHandler } from "./main"

/**
 * Interface representing a handler for database operations.
 */
export interface DatabaseHandler {
  /**
   * Authenticates the database connection.
   *
   * @returns A promise that resolves to a boolean indicating whether the authentication was successful.
   */
  authenticate: RendererHandler<() => Promise<boolean>>

  /**
   * Checks if the database version matches the provided version.
   *
   * @param lastVersion - The last known version of the database.
   * @returns A promise that resolves to a boolean indicating whether the version matches.
   */
  checkVersion: RendererHandler<
    (lastVersion: DatabaseVersion) => Promise<boolean>
  >

  /**
   * Synchronizes the database to the latest version.
   * Applies all necessary migrations to update the database to the latest version.
   *
   * @param lastVersion - The last known version of the database.
   * @returns A promise that resolves to the new version of the database.
   */
  sync: RendererHandler<
    (lastVersion: DatabaseVersion) => Promise<DatabaseVersion>
  >

  /**
   * Retrieves the current version of the database.
   *
   * @returns A promise that resolves to the current version of the database.
   */
  getVersion: RendererHandler<() => Promise<DatabaseVersion>>

  /**
   * Handles settings related operations in the database.
   */
  settings: SettingsHandler

  /**
   * Handles media related operations in the database.
   */
  media: MediaHandler

  /**
   * Handles dictionary related operations in the database.
   */
  dictionary: DictionaryHandler

  /**
   * Handles tag related operations in the database.
   */
  tag: TagHandler
}
