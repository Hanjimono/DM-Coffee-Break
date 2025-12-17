import { AvailableDictionaries, DictionaryData } from "../dictionary"
import { RendererHandler } from "./main"

/** Interface representing the data transfer object for retrieving a dictionary.
 */
interface DictionaryGetDTO {
  /**
   *  The type of dictionary to retrieve.
   */
  dictionaryType: AvailableDictionaries
}

/**
 * Interface representing a handler for media-related operations.
 */
export interface DictionaryHandler {
  /**
   * Retrieves a list of categories that are used to categorize media.
   *
   * @returns
   */
  get: RendererHandler<(arg: DictionaryGetDTO) => Promise<DictionaryData[]>>
}
