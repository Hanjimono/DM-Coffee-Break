// helpers
import { handleIpcMain } from "./main"
// containers
import { container } from "../../container"
// constants
import { DICTIONARY_IPC_CHANNELS } from "@cross/constants/ipc"
// types
import { DictionaryHandler } from "@cross/types/handlers/dictionary"
/**
 * Get dictionary data from the database
 */
handleIpcMain<DictionaryHandler["get"]>(
  DICTIONARY_IPC_CHANNELS.GET,
  async (event, data) => {
    return await container.dictionaryService.getDictionaryData(
      data.dictionaryType
    )
  }
)
