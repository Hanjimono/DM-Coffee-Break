//system
import {
  useContext,
  useEffect,
  useState,
  createContext,
  useCallback
} from "react"
import * as yup from "yup"
import {
  DefaultValues,
  FieldValues,
  Path,
  useForm,
  UseFormReturn
} from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
// store
import { useStore } from "@/store"
// constants
import { DEFAULT_USER_SETTINGS } from "@cross/constants/settings"
// types
import {
  AvailableSettingsCategories,
  UserSettings
} from "@cross/types/database/settings"
import { DatabaseHandler } from "@cross/types/handlers/database"

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
 * Custom hook to access the settings from the SettingsContext.
 *
 * @returns {object} The current settings from the SettingsContext.
 */
export const useSettings = () => {
  const { settings } = useContext(SettingsContext)
  return settings
}

/**
 * Custom hook to retrieve the `updateSettings` function from the `SettingsContext`.
 *
 * @returns {Function} The `updateSettings` function from the `SettingsContext`.
 */
export const useUpdateSettings = () => {
  const { updateSettings } = useContext(SettingsContext)
  return updateSettings
}

/**
 * Custom hook to manage a settings form with on-the-fly saving.
 * On every change settings are saved to the database. If the save fails, the previous value is restored.
 *
 * @param {DefaultValues<FormValues>} defaultValues - The default values for the form.
 * @param {FormValues} [yupFormObject={}] - The Yup schema object for form validation.
 * @param {AvailableSettingsCategories} [category] - The category of the settings.
 * @returns {[UseFormReturn<FormValues>, (name: string, value: string) => void]} - Returns an array containing the form methods and a handleChange function.
 *
 * @example
 * const [methods, handleChange] = useSettingsFormOnFly(defaultValues, yupFormObject);
 */
export const useSettingsFormOnFly = <FormValues extends FieldValues>(
  defaultValues: FormValues,
  yupFormObject: any,
  category?: AvailableSettingsCategories
): [UseFormReturn<FormValues>, (name: string, value: string) => void] => {
  const database = useDatabase()
  const updateSettings = useUpdateSettings()
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(yup.object(yupFormObject).shape({})) as any,
    defaultValues: defaultValues as DefaultValues<FormValues>
  })
  const errorSnack = useStore((state) => state.errorSnack)
  const [formHistory, setFormHistory] = useState(defaultValues)
  const handleChange = useCallback(
    async (name: string, value: string) => {
      clearTimeout((window as any).setSettingTimeout)
      ;(window as any).setSettingTimeout = setTimeout(async () => {
        const saveResult = await database.settings.set(name, value, category)
        if (!saveResult) {
          errorSnack("Failed to save settings")
          methods.setValue(name as Path<FormValues>, formHistory[name])
          return
        }
        setFormHistory({ ...formHistory, [name]: value })
        updateSettings()
      }, 300)
    },
    [database, errorSnack, formHistory, methods, updateSettings, category]
  )
  return [methods, handleChange] as const
}
