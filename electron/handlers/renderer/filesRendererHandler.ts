import { ipcRenderer } from "electron"
import { FilesHandler } from "@cross/types/handlers/files"
import { FILES_IPC_CHANNELS } from "@cross/constants/ipc"

export const filesRendererHandler: FilesHandler = {
  openSelectFileDialog: async () =>
    ipcRenderer.invoke(FILES_IPC_CHANNELS.OPEN_SELECT_FILE_DIALOG)
}
