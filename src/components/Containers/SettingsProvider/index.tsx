"use client"
// system
import { createContext, useContext } from "react"
// utils
import { useCIpc } from "@/components/Containers/CIpcProvider/cIpcProviderContainer.client"
// constants
import { DEFAULT_USER_SETTINGS } from "@cross/constants/settings"
import { UserSettings } from "@cross/types/database/settings"

/** Context for user settings */
const SettingsContext = createContext<UserSettings>(DEFAULT_USER_SETTINGS)

/** Hook to use user settings */
export const useSettings = () => {
  const settings = useContext(SettingsContext)
  return settings
}

/** Provider component for user settings */
export default function SettingsProvider({
  children
}: {
  children: React.ReactNode
}) {
  const cIpc = useCIpc()
  const userSettings = cIpc.database.settings.get()
  return (
    <SettingsContext.Provider
      value={
        !userSettings.isPending && userSettings.data
          ? userSettings.data
          : DEFAULT_USER_SETTINGS
      }
    >
      {children}
    </SettingsContext.Provider>
  )
}
