// system
import * as yup from "yup"
// components
import { useSettings, useSettingsFormOnFly } from "@/components/Helpers/Hooks"
// ui
import Room from "@/ui/Layout/Room"
import Text from "@/ui/Presentation/Text"
import Title from "@/ui/Presentation/Title"
import Form from "@/ui/Form/Form"
import Input from "@/ui/Form/Input"
// constants
import { SETTINGS_CATEGORIES } from "@cross/constants/settingsCategories"
import { MEDIA_PLAYER_SETTINGS_CLIPBOARD_KEYS } from "@cross/constants/settingsMedia"

const yupSettings = {
  [MEDIA_PLAYER_SETTINGS_CLIPBOARD_KEYS.PREFIX]: yup.string().required()
}

/**
 * Form for clipboard player settings
 */
export default function ClipboardPlayerSettings() {
  const settings = useSettings()
  const [methods, handleChange] = useSettingsFormOnFly(
    settings.media.player.clipboard,
    yupSettings,
    SETTINGS_CATEGORIES.MEDIA
  )
  return (
    <Room bottomGap="same-level">
      <Title bottomGap="same" size={6}>
        Clipboard settings
      </Title>
      <Text>
        After click on play button for song, it&apos;s link will be copied to
        your clipboard. Alongside with this defined prefix. So you can easily
        past it to discord chat as command.
      </Text>
      <Form methods={methods} onChange={handleChange}>
        <Input
          name={MEDIA_PLAYER_SETTINGS_CLIPBOARD_KEYS.PREFIX}
          label="Clipboard prefix"
          placeholder="Type your command prefix or leave blank to copy only link"
        />
      </Form>
    </Room>
  )
}
