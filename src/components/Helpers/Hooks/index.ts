import { DEFAULT_USER_SETTINGS } from "@cross/constants/settings"
import { UserSettings } from "@cross/types/database/settings"
import { DatabaseHandler } from "@cross/types/handlers/database"
import {
  useContext,
  useEffect,
  useState,
  createContext,
  useCallback
} from "react"

/**
 * Context for accessing the database handler.
 *
 * This context provides a way to interact with the database handler throughout the component tree.
 *
 * @type {DatabaseHandler} - The type of the database handler.
 */
export const DatabaseContext = createContext({} as DatabaseHandler)

/**
 * Context for managing user settings.
 *
 * This context provides the current settings and a function to update them.
 *
 * @constant
 * @type {React.Context<{ settings: typeof DEFAULT_USER_SETTINGS, updateSettings: () => void }>}
 */
export const SettingsContext = createContext({
  settings: DEFAULT_USER_SETTINGS,
  updateSettings: () => {}
})

/**
 * Custom hook to create and manage a database context.
 *
 * This hook initializes the database object and after the component is mounted it
 * sets it to renderer database handler.
 *
 * @returns {DatabaseHandler} The current database context.
 */
export const useCreateDatabaseContext = () => {
  const [database, setDatabase] = useState({})
  useEffect(() => {
    setDatabase((window as any).database as DatabaseHandler)
    return () => {
      setDatabase({} as DatabaseHandler)
    }
  }, [])
  return database
}

/**
 * Custom hook to access the database context.
 *
 * This hook provides access to the `DatabaseContext` and returns the current
 * database instance.
 *
 * @returns {Database} The current database instance from the context.
 */
export const useDatabase = () => {
  const database = useContext(DatabaseContext)
  return database
}

/**
 * Custom hook that creates a settings context.
 *
 * This hook initializes the user settings state with default values and provides
 * a function to update the settings from the database.
 */
export const useCreateSettingsContext: () => [
  UserSettings,
  () => void
] = () => {
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_USER_SETTINGS)
  const database = useDatabase()
  const updateSettings = useCallback(async () => {
    const settings = await database.settings.get()
    if (settings) {
      setSettings(settings)
    }
  }, [database])
  useEffect(() => {
    if (!!database) {
      updateSettings()
    }
  }, [database, updateSettings])
  return [settings, updateSettings]
}

/**
 * Custom hook to access and update user settings from the SettingsContext.
 *
 * @returns {[UserSettings, () => void]} A tuple containing the current user settings and a function to update the settings.
 */
export const useSettings: () => [UserSettings, () => void] = () => {
  const { settings, updateSettings } = useContext(SettingsContext)
  return [settings, updateSettings]
}
