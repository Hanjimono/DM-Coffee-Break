import { ipcRenderer } from "electron"

export const databaseRendererHandler = {
  authenticate: async () => ipcRenderer.invoke("database-authenticate")
}
