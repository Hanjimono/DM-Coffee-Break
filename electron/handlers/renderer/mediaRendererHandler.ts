import { ipcRenderer } from "electron"
import { MediaHandler } from "@cross/types/handlers/media"
import { MEDIA_IPC_CHANNELS } from "@cross/constants/ipc"

export const mediaRendererHandler: MediaHandler = {
  saveCategory: async (data, meta) =>
    ipcRenderer.invoke(MEDIA_IPC_CHANNELS.SAVE_CATEGORY, data, meta),
  deleteCategory: async (id, meta) =>
    ipcRenderer.invoke(MEDIA_IPC_CHANNELS.DELETE_CATEGORY, id, meta),
  getCategories: async (meta) =>
    ipcRenderer.invoke(MEDIA_IPC_CHANNELS.GET_CATEGORIES, meta),
  getSong: async (id, meta) =>
    ipcRenderer.invoke(MEDIA_IPC_CHANNELS.GET_SONG, id, meta),
  editSong: async (data, meta) =>
    ipcRenderer.invoke(MEDIA_IPC_CHANNELS.EDIT_SONG, data, meta),
  deleteSong: async (id, meta) =>
    ipcRenderer.invoke(MEDIA_IPC_CHANNELS.DELETE_SONG, id, meta),
  getSongs: async (categoryId, meta) =>
    ipcRenderer.invoke(MEDIA_IPC_CHANNELS.GET_SONGS, categoryId, meta),
  getUnassignedSongs: async (meta) =>
    ipcRenderer.invoke(MEDIA_IPC_CHANNELS.GET_UNASSIGNED_SONGS, meta)
}
