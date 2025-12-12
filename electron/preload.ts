import { contextBridge, ipcRenderer } from "electron"
import { mainRendererHandler } from "./handlers/renderer/mainRendererHandler"

contextBridge.exposeInMainWorld("electron", {
  ipcRenderer: {
    send: (channel: string, data: any) => ipcRenderer.send(channel, data),
    on: (channel: string, listener: (event: any, ...args: any[]) => void) =>
      ipcRenderer.on(channel, listener)
  }
})

// preloader of all ipc modules for cIPC SDK
contextBridge.exposeInMainWorld("ipcHandler", mainRendererHandler)

import "./discordMusicBotObject"
