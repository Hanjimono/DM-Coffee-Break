import {
  AVAILABLE_SONG_CARD_SETTINGS,
  SONG_CARD_SETTINGS
} from "../database/settings/media"

/**
 * Interface for handling song card settings.
 */
export interface SONG_CARD_SETTINGS_HANDLER {
  /**
   * Retrieves the current song card settings.
   * @returns A promise that resolves to the current song card settings.
   */
  get: () => Promise<SONG_CARD_SETTINGS>

  /**
   * Updates all the song card settings. Can be used to add new settings.
   * @param settings - The new song card settings to be applied.
   * @returns A promise that resolves to a boolean indicating whether the update was successful.
   */
  set: (settings: SONG_CARD_SETTINGS) => Promise<boolean>

  /**
   * Updates a specific song card setting.
   * @param key - The key of the setting to be updated.
   * @param value - The new value for the specified setting.
   * @returns A promise that resolves to a boolean indicating whether the update was successful.
   */
  setOne: (key: AVAILABLE_SONG_CARD_SETTINGS, value: string) => Promise<boolean>
}
