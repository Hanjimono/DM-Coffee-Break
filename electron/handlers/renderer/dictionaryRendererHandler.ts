import { ipcRenderer } from "electron"
import { DictionaryHandler } from "@cross/types/handlers/dictionary"
import { DICTIONARY_IPC_CHANNELS } from "@cross/constants/ipc"

export const dictionaryRendererHandler: DictionaryHandler = {
  get: async (dictionaryType, meta) =>
    ipcRenderer.invoke(DICTIONARY_IPC_CHANNELS.GET, dictionaryType, meta)
}
