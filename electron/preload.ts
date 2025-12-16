import { contextBridge, ipcRenderer } from "electron"
import { mainRendererHandler } from "./handlers/renderer/mainRendererHandler"

contextBridge.exposeInMainWorld("electron", {
  ipcRenderer: {
    send: (channel: string, data: any) => ipcRenderer.send(channel, data),
    on: (channel: string, listener: (event: any, ...args: any[]) => void) =>
      ipcRenderer.on(channel, listener)
  }
})

const arg = process.argv.find((a) => a.startsWith("--userConfig="))
const config = arg ? JSON.parse(arg.replace("--userConfig=", "")) : {}

// preloader of all ipc modules for cIPC SDK
contextBridge.exposeInMainWorld("ipcHandler", mainRendererHandler)

contextBridge.exposeInMainWorld("cIpcEnv", {
  userConfig: config
})

import "./discordMusicBotObject"
