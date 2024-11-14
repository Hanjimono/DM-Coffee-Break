import { ipcRenderer } from "electron"
import { MediaHandler } from "@cross/types/handlers/media"

export const mediaRendererHandler: MediaHandler = {
  saveCategory: async (data) => ipcRenderer.invoke("media-save-category", data),
  deleteCategory: async (id) => ipcRenderer.invoke("media-delete-category", id),
  getCategories: async () => ipcRenderer.invoke("media-get-categories")
}
