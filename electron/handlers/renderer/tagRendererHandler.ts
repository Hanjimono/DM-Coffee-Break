import { TAG_IPC_CHANNELS } from "@cross/constants/ipc"
import { TagHandler } from "@cross/types/handlers/tag"
import { ipcRenderer } from "electron"

export const tagRendererHandler: TagHandler = {
  getAll: async (meta) => ipcRenderer.invoke(TAG_IPC_CHANNELS.GET_ALL, meta),
  edit: async (arg, meta) =>
    ipcRenderer.invoke(TAG_IPC_CHANNELS.EDIT, arg, meta),
  delete: async (arg, meta) =>
    ipcRenderer.invoke(TAG_IPC_CHANNELS.DELETE, arg, meta)
}
