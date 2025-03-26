import { contextBridge, ipcRenderer } from "electron"
import { databaseRendererHandler } from "./handlers/renderer/databaseRendererHandler"
import { songParserRendererHandler } from "./handlers/renderer/songParserRendererHandler"
import { musicPlayerRendererHandler } from "./handlers/renderer/musicPlayerRendererHandler"
import { filesRendererHandler } from "./handlers/renderer/filesRendererHandler"

contextBridge.exposeInMainWorld("electron", {
  ipcRenderer: {
    send: (channel: string, data: any) => ipcRenderer.send(channel, data),
    on: (channel: string, listener: (event: any, ...args: any[]) => void) =>
      ipcRenderer.on(channel, listener)
  }
})

contextBridge.exposeInMainWorld("database", databaseRendererHandler)

contextBridge.exposeInMainWorld("songParser", songParserRendererHandler)

contextBridge.exposeInMainWorld("filesHandler", filesRendererHandler)

contextBridge.exposeInMainWorld("musicPlayer", musicPlayerRendererHandler)

import "./discordMusicBotObject"
