import { AvailableDictionaries, DictionaryData } from "../dictionary"

/**
 * Interface representing a handler for media-related operations.
 */
export interface DictionaryHandler {
  /**
   * Retrieves a list of categories that are used to categorize media.
   *
   * @returns
   */
  get: (dictionaryType: AvailableDictionaries) => Promise<DictionaryData[]>
}
