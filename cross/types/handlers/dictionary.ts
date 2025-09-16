import { AvailableDictionaries, DictionaryData } from "../dictionary"
import { RendererHandler } from "./main"

/**
 * Interface representing a handler for media-related operations.
 */
export interface DictionaryHandler {
  /**
   * Retrieves a list of categories that are used to categorize media.
   *
   * @returns
   */
  get: RendererHandler<
    (dictionaryType: AvailableDictionaries) => Promise<DictionaryData[]>
  >
}
