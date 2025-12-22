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
import Note from "@/ds/Presentation/Note"
import Stack from "@/ui/Layout/Stack"
import { FormElementLine } from "@/ui/Form/FormElementWrapper"
// constants
import { SETTINGS_CATEGORIES } from "@cross/constants/settingsCategories"
import { MEDIA_PLAYER_SETTINGS_API_KEYS } from "@cross/constants/settingsMedia"

const apiPlayerSettingsSchema = zod.object({
  [MEDIA_PLAYER_SETTINGS_API_KEYS.CHANNEL_ID]: zod.string(),
  [MEDIA_PLAYER_SETTINGS_API_KEYS.PLAY_PREFIX]: zod.string(),
  [MEDIA_PLAYER_SETTINGS_API_KEYS.STOP_PREFIX]: zod.string(),
  [MEDIA_PLAYER_SETTINGS_API_KEYS.WEBHOOK_URL]: zod.string()
})

/**
 * Form for API player settings
 */
export default function ApiPlayerSettingsForm() {
  const settings = useSettings()
  const [methods, handleChange] = useChangedSettings(
    apiPlayerSettingsSchema,
    {
      [MEDIA_PLAYER_SETTINGS_API_KEYS.CHANNEL_ID]:
        settings.media.player.api.channelId,
      [MEDIA_PLAYER_SETTINGS_API_KEYS.PLAY_PREFIX]:
        settings.media.player.api.playPrefix,
      [MEDIA_PLAYER_SETTINGS_API_KEYS.STOP_PREFIX]:
        settings.media.player.api.stopPrefix,
      [MEDIA_PLAYER_SETTINGS_API_KEYS.WEBHOOK_URL]:
        settings.media.player.api.webhookUrl
    },
    SETTINGS_CATEGORIES.MEDIA
  )
  return (
    <Room>
      <Stack gap="same-level">
        <Stack gap="tight">
          <Title size={6}>Discord api settings</Title>
          <Text>
            If you are using some third-party bot to play your media, you can
            automatically send commands to selected discord channel.
          </Text>
        </Stack>
        <Note className="mb-close" type="warning">
          Discord API forbids sending messages to the channel starting with
          &quot;/&quot;. Your bot should have understand a simple message,
          without &quot;/&quot; at the start.
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
          <FormElementLine>
            <Input
              label="Play command"
              name={MEDIA_PLAYER_SETTINGS_API_KEYS.PLAY_PREFIX}
            />
            <Input
              label="Stop command"
              name={MEDIA_PLAYER_SETTINGS_API_KEYS.STOP_PREFIX}
            />
          </FormElementLine>
        </Form>
      </Stack>
    </Room>
  )
}
