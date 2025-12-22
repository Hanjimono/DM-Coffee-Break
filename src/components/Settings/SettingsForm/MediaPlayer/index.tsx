"use client"
// system
import * as zod from "zod"
// component
import SettingsHeader from "@/components/Settings/SettingsHeader"
import ApiPlayerSettingsForm from "./ApiForm"
import ClipboardPlayerSettingsForm from "./ClipboardForm"
import BotPlayerSettingsForm from "./BotForm"
// utils
import { useChangedSettings } from "../utils"
import { useSettings } from "@/components/Containers/SettingsProvider"
// ui
import Room, { HiddenRoom } from "@/ui/Layout/Room"
import Title from "@/ui/Presentation/Title"
import Form from "@/ui/Form/Form"
import Radio from "@/ui/Form/Radio"
import Stack from "@/ui/Layout/Stack"
// constants
import { MEDIA_PLAYER_TYPES } from "@cross/constants/media"
import { MEDIA_PLAYER_SETTINGS_TYPE_KEY } from "@cross/constants/settingsMedia"
import { SETTINGS_CATEGORIES } from "@cross/constants/settingsCategories"

export const mediaPlayerSettingsSchema = zod.object({
  [MEDIA_PLAYER_SETTINGS_TYPE_KEY]: zod.number()
})

/**
 * Settings for media player
 */
export default function MediaPlayerSettings() {
  const settings = useSettings()
  const [methods, handleChange] = useChangedSettings(
    mediaPlayerSettingsSchema,
    { [MEDIA_PLAYER_SETTINGS_TYPE_KEY]: settings.media.player.type },
    SETTINGS_CATEGORIES.MEDIA
  )
  const currentSettings = methods.watch()
  return (
    <>
      <Room className="mb-distant">
        <SettingsHeader
          title="Media Player Settings"
          description="You can customize what happens when the play button is clicked for your media library"
        />
      </Room>
      <Room className="mb-distant">
        <Stack gap="same-level">
          <Title size={6}>Type of action</Title>
          <Form methods={methods} onChange={handleChange}>
            <Radio
              type="rows"
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
        </Stack>
      </Room>
      <HiddenRoom
        isShown={
          currentSettings[MEDIA_PLAYER_SETTINGS_TYPE_KEY] ==
          MEDIA_PLAYER_TYPES.API
        }
      >
        <ApiPlayerSettingsForm />
      </HiddenRoom>
      <HiddenRoom
        isShown={
          currentSettings[MEDIA_PLAYER_SETTINGS_TYPE_KEY] ==
          MEDIA_PLAYER_TYPES.CLIPBOARD
        }
      >
        <ClipboardPlayerSettingsForm />
      </HiddenRoom>
      <HiddenRoom
        isShown={
          currentSettings[MEDIA_PLAYER_SETTINGS_TYPE_KEY] ==
          MEDIA_PLAYER_TYPES.BOT
        }
      >
        <BotPlayerSettingsForm />
      </HiddenRoom>
    </>
  )
}
