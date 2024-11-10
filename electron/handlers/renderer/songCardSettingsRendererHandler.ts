import { ipcRenderer } from "electron"
import { SONG_CARD_SETTINGS_HANDLER } from "@cross/types/handlers/songCardSettings"

export const songCardSettingsRendererHandler: SONG_CARD_SETTINGS_HANDLER = {
  get: async () => ipcRenderer.invoke("song-card-settings-get"),
  set: async (settings) =>
    ipcRenderer.invoke("song-card-settings-set", settings),
  setOne: async (key, value) =>
    ipcRenderer.invoke("song-card-settings-set-one", key, value)
}
