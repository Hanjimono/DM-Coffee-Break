import { ipcRenderer } from "electron"
import { MediaHandler } from "@cross/types/handlers/media"
import { MEDIA_IPC_CHANNELS } from "@cross/constants/ipc"

export const mediaRendererHandler: MediaHandler = {
  saveCategory: async (arg, meta) =>
    ipcRenderer.invoke(MEDIA_IPC_CHANNELS.SAVE_CATEGORY, arg, meta),
  deleteCategory: async (arg, meta) =>
    ipcRenderer.invoke(MEDIA_IPC_CHANNELS.DELETE_CATEGORY, arg, meta),
  getCategories: async (meta) =>
    ipcRenderer.invoke(MEDIA_IPC_CHANNELS.GET_CATEGORIES, meta),
  getSong: async (arg, meta) =>
    ipcRenderer.invoke(MEDIA_IPC_CHANNELS.GET_SONG, arg, meta),
  editSong: async (arg, meta) =>
    ipcRenderer.invoke(MEDIA_IPC_CHANNELS.EDIT_SONG, arg, meta),
  deleteSong: async (arg, meta) =>
    ipcRenderer.invoke(MEDIA_IPC_CHANNELS.DELETE_SONG, arg, meta),
  getSongs: async (arg, meta) =>
    ipcRenderer.invoke(MEDIA_IPC_CHANNELS.GET_SONGS, arg, meta),
  getUnassignedSongs: async (meta) =>
    ipcRenderer.invoke(MEDIA_IPC_CHANNELS.GET_UNASSIGNED_SONGS, meta)
}
