import { DictionaryHandler } from "./handlers/dictionary"

export type AvailableDictionaries = "mediaCategory"

export interface DictionaryData {
  title: string
  value: number | string
}
