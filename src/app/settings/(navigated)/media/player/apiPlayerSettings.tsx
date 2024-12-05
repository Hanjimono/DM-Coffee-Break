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
import { SETTINGS_CATEGORIES } from "@cross/constants/settingsCategories"
import { MEDIA_PLAYER_SETTINGS_API_KEYS } from "@cross/constants/settingsMedia"

const yupSettings = {
  [MEDIA_PLAYER_SETTINGS_API_KEYS.CHANNEL_ID]: yup.string().required(),
  [MEDIA_PLAYER_SETTINGS_API_KEYS.PLAY_PREFIX]: yup.string().required(),
  [MEDIA_PLAYER_SETTINGS_API_KEYS.STOP_PREFIX]: yup.string().required(),
  [MEDIA_PLAYER_SETTINGS_API_KEYS.WEBHOOK_URL]: yup.string().required()
}

/**
 * Form for API player settings
 */
export default function ApiPlayerSettings() {
  const settings = useSettings()
  const [methods, handleChange] = useSettingsFormOnFly(
    settings.media.player.api,
    yupSettings,
    SETTINGS_CATEGORIES.MEDIA
  )
  return (
    <Room bottomGap="same-level">
      <Title bottomGap="same" size={6}>
        Discord api settings
      </Title>
      <Text>
        If you are using some third-party bot to play your media, you can
        automatically send commands to selected discord channel.
      </Text>
      <Note>
        Discord API forbids sending messages to the channel starting with
        &quot;/&quot;. Your bot should have understand a simple message, without
        &quot;/&quot; at the start.
      </Note>
      <Form methods={methods} onChange={handleChange}>
        <Input
          label="Webhook URL"
          name={MEDIA_PLAYER_SETTINGS_API_KEYS.WEBHOOK_URL}
        />
        <Input
          label="Channel ID"
          name={MEDIA_PLAYER_SETTINGS_API_KEYS.CHANNEL_ID}
        />
        <Input
          label="Play command"
          name={MEDIA_PLAYER_SETTINGS_API_KEYS.PLAY_PREFIX}
        />
        <Input
          label="Stop command"
          name={MEDIA_PLAYER_SETTINGS_API_KEYS.STOP_PREFIX}
        />
      </Form>
    </Room>
  )
}
