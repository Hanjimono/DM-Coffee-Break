// system
import * as zod from "zod"
// utils
import { useChangedSettings } from "../../utils"
import { useSettings } from "@/components/Containers/SettingsProvider"
// ui
import Room from "@/ui/Layout/Room"
import Text from "@/ui/Presentation/Text"
import Title from "@/ui/Presentation/Title"
import Form from "@/ui/Form/Form"
import Input from "@/ui/Form/Input"
import Stack from "@/ui/Layout/Stack"
// constants
import { SETTINGS_CATEGORIES } from "@cross/constants/settingsCategories"
import { MEDIA_PLAYER_SETTINGS_CLIPBOARD_KEYS } from "@cross/constants/settingsMedia"

const clipboardSettingsSchema = zod.object({
  [MEDIA_PLAYER_SETTINGS_CLIPBOARD_KEYS.PREFIX]: zod.string()
})

/**
 * Form for clipboard player settings
 */
export default function ClipboardPlayerSettingsForm() {
  const settings = useSettings()
  const [methods, handleChange] = useChangedSettings(
    clipboardSettingsSchema,
    {
      [MEDIA_PLAYER_SETTINGS_CLIPBOARD_KEYS.PREFIX]:
        settings.media.player.clipboard.prefix
    },
    SETTINGS_CATEGORIES.MEDIA
  )
  return (
    <Room>
      <Stack>
        <Stack gap="tight">
          <Title size={6}>Clipboard settings</Title>
          <Text>
            After click on play button for song, it&apos;s link will be copied
            to your clipboard. Alongside with this defined prefix. So you can
            easily past it to discord chat as command.
          </Text>
        </Stack>
        <Form methods={methods} onChange={handleChange}>
          <Input
            name={MEDIA_PLAYER_SETTINGS_CLIPBOARD_KEYS.PREFIX}
            label="Clipboard prefix"
            placeholder="Type your command prefix or leave blank to copy only link"
          />
        </Form>
      </Stack>
    </Room>
  )
}
