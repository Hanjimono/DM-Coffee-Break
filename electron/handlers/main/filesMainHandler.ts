// system
import { dialog } from "electron"
// helpers
import { handleIpcMain } from "./main"
// constants
import { FILES_IPC_CHANNELS } from "@cross/constants/ipc"
// types
import { FilesHandler } from "@cross/types/handlers/files"

/**
 * Run the song parser to parse the song info
 */
handleIpcMain<FilesHandler["openSelectFileDialog"]>(
  FILES_IPC_CHANNELS.OPEN_SELECT_FILE_DIALOG,
  async (event) => {
    const result = await dialog.showOpenDialog({
      properties: ["openFile"]
    })
    if (!result) return undefined
    return result.filePaths[0]
  }
)
