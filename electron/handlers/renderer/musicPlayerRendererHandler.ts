import { ipcRenderer } from "electron"
import { MusicPlayerHandler } from "@cross/types/handlers/musicPlayer"

export const musicPlayerRendererHandler: MusicPlayerHandler = {
  getStatus: async () => ipcRenderer.invoke("music-player-get-status"),
  play: async (song) => ipcRenderer.invoke("music-player-play", song),
  resume: async () => ipcRenderer.invoke("music-player-resume"),
  pause: async () => ipcRenderer.invoke("music-player-pause"),
  stop: async () => ipcRenderer.invoke("music-player-stop")
}
