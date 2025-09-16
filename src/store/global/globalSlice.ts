// System
import { StateCreator } from "zustand"
// Constants
import { DEFAULT_USER_SETTINGS } from "@cross/constants/settings"
// Types
import { UserSettings } from "@cross/types/database/settings"
import { getDatabase } from "@/constants/singletons/databaseSingleton"

export interface GlobalState {
  globalSettings: UserSettings
  updateSettings: () => void
}

export const createGlobalStore: StateCreator<GlobalState> = (set, get) => ({
  globalSettings: DEFAULT_USER_SETTINGS,
  updateSettings: async () => {
    const database = getDatabase()
    const settings = await database.settings.get()
    if (settings) {
      set({ globalSettings: settings })
    }
  }
})
