import { SONG_CARD_SETTINGS_HANDLER } from "./songCardSettings"

/**
 * Handler for settings operations with the database
 */
export interface SETTINGS_HANDLER {
  /**
   * Handler for song card settings operations with the database
   */
  songCard: SONG_CARD_SETTINGS_HANDLER
}
