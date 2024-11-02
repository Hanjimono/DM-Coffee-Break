import { contextBridge, ipcRenderer } from "electron"
import { databaseRendererHandler } from "./database/rendererHandler"

contextBridge.exposeInMainWorld("electron", {
  ipcRenderer: {
    send: (channel: string, data: any) => ipcRenderer.send(channel, data),
    on: (channel: string, listener: (event: any, ...args: any[]) => void) =>
      ipcRenderer.on(channel, listener)
  }
})

contextBridge.exposeInMainWorld("database", databaseRendererHandler)
