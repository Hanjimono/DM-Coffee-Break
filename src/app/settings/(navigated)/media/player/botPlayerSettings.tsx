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
import Note from "@/ui/Presentation/Note"
// constants
import { MEDIA_PLAYER_SETTINGS_BOT_KEYS } from "@cross/constants/settingsMedia"
import { SETTINGS_CATEGORIES } from "@cross/constants/settingsCategories"

const yupSettings = {
  [MEDIA_PLAYER_SETTINGS_BOT_KEYS.BOT_TOKEN]: yup.string().required()
}

/**
 * Form for bot player settings
 */
export default function BotPlayerSettings() {
  const settings = useSettings()
  const [methods, handleChange] = useSettingsFormOnFly(
    settings.media.player.bot,
    yupSettings,
    SETTINGS_CATEGORIES.MEDIA
  )
  return (
    <Room bottomGap="same-level">
      <Title bottomGap="same" size={6}>
        DM Coffee Break Bot settings
      </Title>
      <Text>You can use this application as music bot.</Text>
      <Form methods={methods} onChange={handleChange}>
        <Input
          label="Token for discord bot"
          name={MEDIA_PLAYER_SETTINGS_BOT_KEYS.BOT_TOKEN}
        />
      </Form>
      <Note>
        Do not forget that you need to create a bot in Discord Developer Portal
        and invite it to your server.
      </Note>
    </Room>
  )
}
