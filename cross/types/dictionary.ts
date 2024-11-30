import { DictionaryHandler } from "./handlers/dictionary"

export type AvailableDictionaries = "mediaCategories"

export interface DictionaryData {
  title: string
  value: number | string
}
