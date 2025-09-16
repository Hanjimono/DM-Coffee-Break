import { AvailableDictionaries } from "@cross/types/dictionary"
import { getDictionaryData } from "../../database/utils/dictionary"
import { handleIpcMain } from "./main"
import { DICTIONARY_IPC_CHANNELS } from "@cross/constants/ipc"
import { DictionaryHandler } from "@cross/types/handlers/dictionary"

/**
 * Get dictionary data from the database
 */
handleIpcMain<DictionaryHandler["get"]>(
  DICTIONARY_IPC_CHANNELS.GET,
  async (event, dictionaryType) => {
    return await getDictionaryData(dictionaryType)
  }
)
