import { ipcRenderer } from "electron"
import { MediaHandler } from "@cross/types/handlers/media"

export const mediaRendererHandler: MediaHandler = {
  saveCategory: async (data) => ipcRenderer.invoke("media-save-category", data),
  deleteCategory: async (id) => ipcRenderer.invoke("media-delete-category", id),
  getCategories: async () => ipcRenderer.invoke("media-get-categories"),
  getSong: async (id) => ipcRenderer.invoke("media-get-song", id),
  editSong: async (data) => ipcRenderer.invoke("media-edit-song", data),
  deleteSong: async (id) => ipcRenderer.invoke("media-delete-song", id),
  getSongs: async () => ipcRenderer.invoke("media-get-songs"),
  getUnassignedSongs: async () =>
    ipcRenderer.invoke("media-get-unassigned-songs")
}
