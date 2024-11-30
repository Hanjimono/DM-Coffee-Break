import { ipcRenderer } from "electron"
import { DictionaryHandler } from "@cross/types/handlers/dictionary"

export const dictionaryRendererHandler: DictionaryHandler = {
  get: async (dictionaryType) =>
    ipcRenderer.invoke("dictionary-get", dictionaryType)
}
