import { ipcRenderer } from "electron"
import { DatabaseHandler } from "@cross/types/handlers/database"
import { songCardSettingsRendererHandler } from "./songCardSettingsRendererHandler"

export const databaseRendererHandler: DatabaseHandler = {
  authenticate: async () => ipcRenderer.invoke("database-authenticate"),
  checkVersion: async (lastVersion) =>
    ipcRenderer.invoke("database-checkVersion", lastVersion),
  sync: async (lastVersion) => ipcRenderer.invoke("database-sync", lastVersion),
  getVersion: async () => ipcRenderer.invoke("database-getVersion"),
  settings: {
    songCard: songCardSettingsRendererHandler
  }
}
