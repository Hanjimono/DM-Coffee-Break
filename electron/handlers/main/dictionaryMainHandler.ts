import { ipcMain } from "electron"
import { AvailableDictionaries } from "@cross/types/dictionary"
import { getDictionaryData } from "../../database/utils/dictionary"

/**
 * Get dictionary data from the database
 */
ipcMain.handle(
  "dictionary-get",
  async (event, dictionaryType: AvailableDictionaries) => {
    return await getDictionaryData(dictionaryType)
  }
)
