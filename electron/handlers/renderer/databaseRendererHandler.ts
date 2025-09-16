import { ipcRenderer } from "electron"
import { DatabaseHandler } from "@cross/types/handlers/database"
import { songCardSettingsRendererHandler } from "./songCardSettingsRendererHandler"
import { mediaRendererHandler } from "./mediaRendererHandler"
import { dictionaryRendererHandler } from "./dictionaryRendererHandler"
import { tagRendererHandler } from "./tagRendererHandler"
import { DATABASE_IPC_CHANNELS } from "@cross/constants/ipc"

export const databaseRendererHandler: DatabaseHandler = {
  authenticate: async () =>
    ipcRenderer.invoke(DATABASE_IPC_CHANNELS.AUTHENTICATE),
  checkVersion: async (lastVersion) =>
    ipcRenderer.invoke(DATABASE_IPC_CHANNELS.CHECK_VERSION, lastVersion),
  sync: async (lastVersion) =>
    ipcRenderer.invoke(DATABASE_IPC_CHANNELS.SYNC, lastVersion),
  getVersion: async () => ipcRenderer.invoke(DATABASE_IPC_CHANNELS.GET_VERSION),
  settings: {
    /** @deprecated use getDomain instead */
    get: async () => ipcRenderer.invoke(DATABASE_IPC_CHANNELS.SETTINGS_GET),
    getDomain: async () =>
      ipcRenderer.invoke(DATABASE_IPC_CHANNELS.SETTINGS_GET_DOMAIN),
    set: async (key, value, category) =>
      ipcRenderer.invoke(
        DATABASE_IPC_CHANNELS.SETTINGS_SET,
        key,
        value,
        category
      ),
    songCard: songCardSettingsRendererHandler
  },
  media: mediaRendererHandler,
  dictionary: dictionaryRendererHandler,
  tag: tagRendererHandler
}
