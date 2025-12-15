import { TAG_IPC_CHANNELS } from "@cross/constants/ipc"
import { TagHandler } from "@cross/types/handlers/tag"
import { ipcRenderer } from "electron"

export const tagRendererHandler: TagHandler = {
  getAll: async (meta) => ipcRenderer.invoke(TAG_IPC_CHANNELS.GET_ALL, meta),
  edit: async (tag, meta) =>
    ipcRenderer.invoke(TAG_IPC_CHANNELS.EDIT, tag, meta),
  delete: async (tagId, meta) =>
    ipcRenderer.invoke(TAG_IPC_CHANNELS.DELETE, tagId, meta)
}
