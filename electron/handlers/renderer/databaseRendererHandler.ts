import { ipcRenderer } from "electron"
import { DatabaseHandler } from "@cross/types/handlers/database"
import { mediaRendererHandler } from "./mediaRendererHandler"
import { dictionaryRendererHandler } from "./dictionaryRendererHandler"
import { tagRendererHandler } from "./tagRendererHandler"
import { DATABASE_IPC_CHANNELS } from "@cross/constants/ipc"

export const databaseRendererHandler: DatabaseHandler = {
  authenticate: async (meta) =>
    ipcRenderer.invoke(DATABASE_IPC_CHANNELS.AUTHENTICATE, meta),
  checkVersion: async (lastVersion, meta) =>
    ipcRenderer.invoke(DATABASE_IPC_CHANNELS.CHECK_VERSION, lastVersion, meta),
  sync: async (lastVersion, meta) =>
    ipcRenderer.invoke(DATABASE_IPC_CHANNELS.SYNC, lastVersion, meta),
  getVersion: async (meta) =>
    ipcRenderer.invoke(DATABASE_IPC_CHANNELS.GET_VERSION, meta),
  settings: {
    /** @deprecated use getDomain instead */
    get: async (meta) =>
      ipcRenderer.invoke(DATABASE_IPC_CHANNELS.SETTINGS_GET, meta),
    set: async (key, value, category, meta) =>
      ipcRenderer.invoke(
        DATABASE_IPC_CHANNELS.SETTINGS_SET,
        key,
        value,
        category,
        meta
      )
  },
  media: mediaRendererHandler,
  dictionary: dictionaryRendererHandler,
  tag: tagRendererHandler
}
