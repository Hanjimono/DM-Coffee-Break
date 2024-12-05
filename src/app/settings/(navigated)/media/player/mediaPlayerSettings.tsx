"use client"
import { useSettings, useSettingsFormOnFly } from "@/components/Helpers/Hooks"
import * as yup from "yup"
// component
import ClipboardPlayerSettings from "./clipboardPlayerSettings"
import ApiPlayerSettings from "./apiPlayerSettings"
import BotPlayerSettings from "./botPlayerSettings"
// ui
import Room, { HiddenRoom } from "@/ui/Layout/Room"
import Divider from "@/ui/Presentation/Divider"
import Text from "@/ui/Presentation/Text"
import Title from "@/ui/Presentation/Title"
import Form from "@/ui/Form/Form"
import Radio from "@/ui/Form/Radio"
// constants
import { MEDIA_PLAYER_TYPES } from "@cross/constants/media"
import { SETTINGS_CATEGORIES } from "@cross/constants/settingsCategories"
import { MEDIA_PLAYER_SETTINGS_TYPE_KEY } from "@cross/constants/settingsMedia"

const yupSettings = {
  [MEDIA_PLAYER_SETTINGS_TYPE_KEY]: yup.number().required()
}

/**
 * Settings for media player
 */
export default function MediaPlayerSettingsContent() {
  const settings = useSettings()
  const [methods, handleChange] = useSettingsFormOnFly(
    { [MEDIA_PLAYER_SETTINGS_TYPE_KEY]: settings.media.player.type },
    yupSettings,
    SETTINGS_CATEGORIES.MEDIA
  )
  const currentSettings = methods.watch()
  return (
    <>
      <Room bottomGap="same-level">
        <Title bottomGap="same">Media Player settings</Title>
        <Text>
          You can customize what happens on the play button click for your media
          library.
        </Text>
        <Divider bottomGap="close" />
      </Room>
      <Room bottomGap="same-level">
        <Title bottomGap="same" size={6}>
          Type of action
        </Title>
        <Form methods={methods} onChange={handleChange}>
          <Radio
            name={MEDIA_PLAYER_SETTINGS_TYPE_KEY}
            options={[
              { value: MEDIA_PLAYER_TYPES.API, title: "Discord API" },
              {
                value: MEDIA_PLAYER_TYPES.CLIPBOARD,
                title: "Copy to Clipboard"
              },
              { value: MEDIA_PLAYER_TYPES.BOT, title: "Play via Discord Bot" }
            ]}
          />
        </Form>
      </Room>
      <HiddenRoom
        isShown={
          currentSettings[MEDIA_PLAYER_SETTINGS_TYPE_KEY] ==
          MEDIA_PLAYER_TYPES.API
        }
      >
        <ApiPlayerSettings />
      </HiddenRoom>
      <HiddenRoom
        isShown={
          currentSettings[MEDIA_PLAYER_SETTINGS_TYPE_KEY] ==
          MEDIA_PLAYER_TYPES.CLIPBOARD
        }
      >
        <ClipboardPlayerSettings />
      </HiddenRoom>
      <HiddenRoom
        isShown={
          currentSettings[MEDIA_PLAYER_SETTINGS_TYPE_KEY] ==
          MEDIA_PLAYER_TYPES.BOT
        }
      >
        <BotPlayerSettings />
      </HiddenRoom>
    </>
  )
}
