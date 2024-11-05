import { ipcRenderer } from "electron"
import { DatabaseHandler } from "@cross/database/types/handlers/database"

export const databaseRendererHandler: DatabaseHandler = {
  authenticate: async () => ipcRenderer.invoke("database-authenticate"),
  checkVersion: async (lastVersion) =>
    ipcRenderer.invoke("database-checkVersion", lastVersion),
  sync: async (lastVersion) => ipcRenderer.invoke("database-sync", lastVersion),
  getVersion: async () => ipcRenderer.invoke("database-getVersion")
}
