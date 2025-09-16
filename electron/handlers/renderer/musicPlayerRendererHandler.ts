import { ipcRenderer } from "electron"
import { MusicPlayerHandler } from "@cross/types/handlers/musicPlayer"
import { MUSIC_IPC_CHANNELS } from "@cross/constants/ipc"

export const musicPlayerRendererHandler: MusicPlayerHandler = {
  getStatus: async () => ipcRenderer.invoke(MUSIC_IPC_CHANNELS.GET_STATUS),
  play: async (song) => ipcRenderer.invoke(MUSIC_IPC_CHANNELS.PLAY, song),
  resume: async () => ipcRenderer.invoke(MUSIC_IPC_CHANNELS.RESUME),
  pause: async () => ipcRenderer.invoke(MUSIC_IPC_CHANNELS.PAUSE),
  stop: async () => ipcRenderer.invoke(MUSIC_IPC_CHANNELS.STOP)
}
