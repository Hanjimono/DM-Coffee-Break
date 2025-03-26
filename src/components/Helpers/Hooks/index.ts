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
import { FilesHandler } from "@cross/types/handlers/files"

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
export const Store = createContext({
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
 * Custom hook to access the settings from the Store.
 *
 * @returns {object} The current settings from the Store.
 */
export const useSettings = () => {
  const settings = useStore((state) => state.globalSettings)
  return settings
}

/**
 * Custom hook to retrieve the `updateSettings` function from the Store
 *
 * @returns {Function} The `updateSettings` function from the Store
 */
export const useUpdateSettings = () => {
  const updateSettings = useStore((state) => state.updateSettings)
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
): [
  UseFormReturn<FormValues>,
  (
    name: string,
    value: any,
    withoutTimeout?: boolean,
    isCustomCall?: boolean
  ) => void
] => {
  const database = useDatabase()
  const updateSettings = useUpdateSettings()
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(yup.object(yupFormObject).shape({})) as any,
    defaultValues: defaultValues as DefaultValues<FormValues>
  })
  const errorSnack = useStore((state) => state.errorSnack)
  const [formHistory, setFormHistory] = useState(defaultValues)
  const handleChangeWithoutTimeout = useCallback(
    async (name: string, value: any, isCustomCall?: boolean) => {
      if (isCustomCall) {
        methods.setValue(name as Path<FormValues>, value)
      }
      const formattedValue =
        typeof value !== "string" ? value.toString() : value
      const saveResult = await database.settings.set(
        name,
        formattedValue,
        category
      )
      if (!saveResult) {
        errorSnack("Failed to save settings")
        methods.setValue(name as Path<FormValues>, formHistory[name])
        return
      }
      setFormHistory({ ...formHistory, [name]: value })
      updateSettings()
    },
    [database, errorSnack, formHistory, methods, updateSettings, category]
  )
  const handleChange = useCallback(
    async (
      name: string,
      value: any,
      withoutTimeout?: boolean,
      isCustomCall?: boolean
    ) => {
      if (withoutTimeout) {
        handleChangeWithoutTimeout(name, value, isCustomCall)
      } else {
        clearTimeout((window as any).setSettingTimeout)
        ;(window as any).setSettingTimeout = setTimeout(
          handleChangeWithoutTimeout,
          300,
          name,
          value,
          isCustomCall
        )
      }
    },
    [handleChangeWithoutTimeout]
  )
  return [methods, handleChange] as const
}

export const useFileHandler = () => {
  const filesHandler = (window as any).filesHandler as FilesHandler
  return filesHandler
}
