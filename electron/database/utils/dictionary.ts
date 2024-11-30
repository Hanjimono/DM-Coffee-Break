import { AvailableDictionaries, DictionaryData } from "@cross/types/dictionary"
import { MediaCategory } from "../models/mediaCategory"

/**
 * Formats an array of objects into an array of `DictionaryData` objects.
 *
 * @param notFormattedData - The array of objects to be formatted.
 * @returns An array of `DictionaryData` objects with `title` and `value` properties.
 */
export function formatDictionaryData(
  notFormattedData: object[]
): DictionaryData[] {
  return notFormattedData.map((entry: any) => {
    return {
      title: entry.title || entry.name,
      value: entry.id
    }
  })
}

/**
 * Retrieves dictionary data based on the provided dictionary name.
 *
 * @param {AvailableDictionaries} dictionaryName - The name of the dictionary to retrieve data for.
 * @returns {Promise<DictionaryData[]>} A promise that resolves to an array of dictionary data.
 */
export async function getDictionaryData(
  dictionaryName: AvailableDictionaries
): Promise<DictionaryData[]> {
  switch (dictionaryName) {
    case "mediaCategories":
      return formatDictionaryData(await MediaCategory.findAll())
      break
    default:
      return []
  }
}
