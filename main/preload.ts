import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron"
import { databaseRendererHandler } from "./database/rendererHandler"

const handler = {
  send(channel: string, value: unknown) {
    ipcRenderer.send(channel, value)
  },
  on(channel: string, callback: (...args: unknown[]) => void) {
    const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
      callback(...args)
    ipcRenderer.on(channel, subscription)

    return () => {
      ipcRenderer.removeListener(channel, subscription)
    }
  }
}

contextBridge.exposeInMainWorld("ipc", handler)

contextBridge.exposeInMainWorld("database", databaseRendererHandler)

export type IpcHandler = typeof handler
