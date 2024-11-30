import { TagHandler } from "@cross/types/handlers/tag"
import { ipcRenderer } from "electron"

export const tagRendererHandler: TagHandler = {
  getAll: async () => ipcRenderer.invoke("tag-get-all"),
  edit: async (tag) => ipcRenderer.invoke("tag-edit", tag),
  delete: async (tagId) => ipcRenderer.invoke("tag-delete", tagId)
}
