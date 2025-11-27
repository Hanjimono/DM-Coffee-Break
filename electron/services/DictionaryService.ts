// services
import { BaseService } from "./BaseService"
// repositories
import { MediaCategoryRepository } from "../repositories/MediaCategoryRepository"
// types
import { AvailableDictionaries, DictionaryData } from "@cross/types/dictionary"

export class DictionaryService extends BaseService {
  constructor(private mediaCategoryRepository: MediaCategoryRepository) {
    super()
  }
  /**
   * Formats an array of objects into an array of `DictionaryData` objects.
   *
   * @param notFormattedData - The array of objects to be formatted.
   * @returns An array of `DictionaryData` objects with `title` and `value` properties.
   */
  formatDictionaryData(notFormattedData: object[]): DictionaryData[] {
    return notFormattedData.map((entry: any) => {
      return {
        title: entry.title || entry.name,
        value: entry.id
      }
    })
  }

  @BaseService.logErrors([])
  /**
   * Retrieves dictionary data for the specified dictionary type.
   *
   * @param dictionaryType - The type of dictionary to retrieve data for.
   * @returns A promise that resolves to an array of dictionary data.
   */
  async getDictionaryData(
    dictionaryType: AvailableDictionaries
  ): Promise<DictionaryData[]> {
    switch (dictionaryType) {
      case "mediaCategory":
        return this.formatDictionaryData(
          await this.mediaCategoryRepository.getAllMediaCategories()
        )
      default:
        return []
    }
  }
}
