// System
import { StateCreator } from "zustand"
// Constants
import {
  DEFAULT_USER_SETTINGS,
  DEFAULT_USER_SETTINGS_DOMAIN
} from "@cross/constants/settings"
// Types
import {
  UserSettings,
  UserSettingsDomain
} from "@cross/types/database/settings"
import { getDatabase } from "@/constants/singletons/databaseSingleton"

export interface GlobalState {
  globalSettings: UserSettingsDomain
  updateSettings: () => void
}

export const createGlobalStore: StateCreator<GlobalState> = (set, get) => ({
  globalSettings: DEFAULT_USER_SETTINGS_DOMAIN,
  updateSettings: async () => {
    const database = getDatabase()
    const settings = await database.settings.getDomain()
    if (settings) {
      set({ globalSettings: settings })
    }
  }
})
