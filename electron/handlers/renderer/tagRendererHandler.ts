import { TAG_IPC_CHANNELS } from "@cross/constants/ipc"
import { TagHandler } from "@cross/types/handlers/tag"
import { ipcRenderer } from "electron"

export const tagRendererHandler: TagHandler = {
  getAll: async () => ipcRenderer.invoke(TAG_IPC_CHANNELS.GET_ALL),
  edit: async (tag) => ipcRenderer.invoke(TAG_IPC_CHANNELS.EDIT, tag),
  delete: async (tagId) => ipcRenderer.invoke(TAG_IPC_CHANNELS.DELETE, tagId)
}
