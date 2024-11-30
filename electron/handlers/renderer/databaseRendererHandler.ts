import { ipcRenderer } from "electron"
import { DatabaseHandler } from "@cross/types/handlers/database"
import { songCardSettingsRendererHandler } from "./songCardSettingsRendererHandler"
import { mediaRendererHandler } from "./mediaRendererHandler"
import { dictionaryRendererHandler } from "./dictionaryRendererHandler"
import { tagRendererHandler } from "./tagRendererHandler"

export const databaseRendererHandler: DatabaseHandler = {
  authenticate: async () => ipcRenderer.invoke("database-authenticate"),
  checkVersion: async (lastVersion) =>
    ipcRenderer.invoke("database-checkVersion", lastVersion),
  sync: async (lastVersion) => ipcRenderer.invoke("database-sync", lastVersion),
  getVersion: async () => ipcRenderer.invoke("database-getVersion"),
  settings: {
    get: async () => ipcRenderer.invoke("database-settings-get"),
    songCard: songCardSettingsRendererHandler
  },
  media: mediaRendererHandler,
  dictionary: dictionaryRendererHandler,
  tag: tagRendererHandler
}
