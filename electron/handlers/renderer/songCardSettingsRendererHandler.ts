import { ipcRenderer } from "electron"
import { SongCardSettingsHandler } from "@cross/types/handlers/songCardSettings"
import { SONG_INFO_SETTINGS_IPC_CHANNELS } from "@cross/constants/ipc"

export const songCardSettingsRendererHandler: SongCardSettingsHandler = {
  get: async () => ipcRenderer.invoke(SONG_INFO_SETTINGS_IPC_CHANNELS.GET),
  set: async (settings) =>
    ipcRenderer.invoke(SONG_INFO_SETTINGS_IPC_CHANNELS.SET, settings),
  setOne: async (key, value) =>
    ipcRenderer.invoke(SONG_INFO_SETTINGS_IPC_CHANNELS.SET_ONE, key, value)
}
