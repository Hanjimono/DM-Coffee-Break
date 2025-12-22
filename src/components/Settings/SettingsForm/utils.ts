import { AvailableSettingsCategories } from "@cross/types/database/settings"
import { SettingSetDTO } from "@cross/types/handlers/settings"
import {
  DefaultValues,
  FieldValues,
  FormProvider,
  Path,
  PathValue,
  useForm
} from "react-hook-form"
import * as zod from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCIpc } from "@/components/Containers/CIpcProvider/cIpcProviderContainer.client"
import { SONG_CARD_SETTINGS_KEYS } from "@cross/constants/settingsMedia"

/**
 * Hook to manage changed settings with validation and saving
 * @param validationSchema Zod schema for validation
 * @param defaultValues Default values for the form
 * @param category Optional settings category
 * @returns Form methods and onChange handler
 */
export const useChangedSettings = <FormValues extends FieldValues>(
  validationSchema: zod.ZodType<FormValues>,
  defaultValues: DefaultValues<FormValues>,
  category?: AvailableSettingsCategories
): [typeof methods, (name: string, value: any) => void] => {
  const cIpc = useCIpc()
  const saveSetting = cIpc.database.settings.set()
  const methods = useForm<FormValues>({
    mode: "onChange",
    resolver: zodResolver(validationSchema),
    defaultValues: defaultValues
  })
  const onChange = (name: string, value: any) => {
    const patch = normalizeSettings(name, value, category)
    patch.settings.forEach(async (setting) => {
      methods.setValue(
        setting.key as Path<FormValues>,
        setting.value as PathValue<FormValues, Path<FormValues>>
      )
    })
    saveSetting.saveMutateAsync(patch)
  }
  return [methods, onChange]
}

export function patchSettings(
  key: string,
  value: string | number | boolean,
  category?: AvailableSettingsCategories
): SettingSetDTO | false {
  if (!validateSettings(key, value)) {
    return false
  }
  return normalizeSettings(key, value, category)
}

export function normalizeSettings(
  key: string,
  value: string | number | boolean,
  category?: AvailableSettingsCategories
): SettingSetDTO {
  let patch = [
    {
      key,
      value: value,
      category
    }
  ]

  // Ensure primary and secondary fields for song card are not the same
  if (key === SONG_CARD_SETTINGS_KEYS.CARD_FULL_PRIMARY) {
    patch.push({
      key: SONG_CARD_SETTINGS_KEYS.CARD_FULL_SECONDARY,
      value: value === "title" ? "comment" : "title",
      category
    })
  }
  if (key === SONG_CARD_SETTINGS_KEYS.CARD_FULL_SECONDARY) {
    patch.push({
      key: SONG_CARD_SETTINGS_KEYS.CARD_FULL_PRIMARY,
      value: value === "title" ? "comment" : "title",
      category
    })
  }
  if (key === SONG_CARD_SETTINGS_KEYS.CARD_SHORT_PRIMARY) {
    patch.push({
      key: SONG_CARD_SETTINGS_KEYS.CARD_SHORT_SECONDARY,
      value: value === "title" ? "comment" : "title",
      category
    })
  }
  if (key === SONG_CARD_SETTINGS_KEYS.CARD_SHORT_SECONDARY) {
    patch.push({
      key: SONG_CARD_SETTINGS_KEYS.CARD_SHORT_PRIMARY,
      value: value === "title" ? "comment" : "title",
      category
    })
  }

  return { settings: patch }
}

export function validateSettings(
  key: string,
  value: string | number | boolean
) {
  return true
}
