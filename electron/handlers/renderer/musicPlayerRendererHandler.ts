import { ipcRenderer } from "electron"
import { MusicPlayerHandler } from "@cross/types/handlers/musicPlayer"
import { MUSIC_IPC_CHANNELS } from "@cross/constants/ipc"

export const musicPlayerRendererHandler: MusicPlayerHandler = {
  getStatus: async (meta) =>
    ipcRenderer.invoke(MUSIC_IPC_CHANNELS.GET_STATUS, meta),
  play: async (arg, meta) =>
    ipcRenderer.invoke(MUSIC_IPC_CHANNELS.PLAY, arg, meta),
  resume: async (meta) => ipcRenderer.invoke(MUSIC_IPC_CHANNELS.RESUME, meta),
  pause: async (meta) => ipcRenderer.invoke(MUSIC_IPC_CHANNELS.PAUSE, meta),
  stop: async (meta) => ipcRenderer.invoke(MUSIC_IPC_CHANNELS.STOP, meta)
}
