import { ipcRenderer } from "electron"
import { FilesHandler } from "@cross/types/handlers/files"

export const filesRendererHandler: FilesHandler = {
  openSelectFileDialog: async () =>
    ipcRenderer.invoke("files-open-select-dialog")
}
