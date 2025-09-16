import { ipcRenderer } from "electron"
import { MediaHandler } from "@cross/types/handlers/media"
import { MEDIA_IPC_CHANNELS } from "@cross/constants/ipc"

export const mediaRendererHandler: MediaHandler = {
  saveCategory: async (data) =>
    ipcRenderer.invoke(MEDIA_IPC_CHANNELS.SAVE_CATEGORY, data),
  deleteCategory: async (id) =>
    ipcRenderer.invoke(MEDIA_IPC_CHANNELS.DELETE_CATEGORY, id),
  getCategories: async () =>
    ipcRenderer.invoke(MEDIA_IPC_CHANNELS.GET_CATEGORIES),
  getSong: async (id) => ipcRenderer.invoke(MEDIA_IPC_CHANNELS.GET_SONG, id),
  editSong: async (data) =>
    ipcRenderer.invoke(MEDIA_IPC_CHANNELS.EDIT_SONG, data),
  deleteSong: async (id) =>
    ipcRenderer.invoke(MEDIA_IPC_CHANNELS.DELETE_SONG, id),
  getSongs: async (categoryId) =>
    ipcRenderer.invoke(MEDIA_IPC_CHANNELS.GET_SONGS, categoryId),
  getUnassignedSongs: async () =>
    ipcRenderer.invoke(MEDIA_IPC_CHANNELS.GET_UNASSIGNED_SONGS)
}
