"use client"
// system
import * as yup from "yup"
import Radio from "@/ui/Form/Radio"
// ui
import Room, { HiddenRoom } from "@/ui/Layout/Room"
import Title from "@/ui/Presentation/Title"
import {
  SONG_CARD_SETTINGS_KEYS,
  SONG_CARD_TYPES
} from "@cross/constants/settingsMedia"
import ShortFormSettings from "./shortFormSettings"
import FullFormSettings from "./fullFormSettings"
import { useSettings, useSettingsFormOnFly } from "@/components/Helpers/Hooks"
import Form from "@/ui/Form/Form"
import { SETTINGS_CATEGORIES } from "@cross/constants/settingsCategories"
import SettingsHeader from "@/components/Settings/SettingsHeader"
import Stack from "@/ui/Layout/Stack"

const yupSettings = {
  [SONG_CARD_SETTINGS_KEYS.SONG_CARD_TYPE]: yup.number().required()
}

export default function SongCardSettingsForm() {
  const settings = useSettings()
  const [methods, handleChange] = useSettingsFormOnFly(
    {
      [SONG_CARD_SETTINGS_KEYS.SONG_CARD_TYPE]:
        settings.media.songCard[SONG_CARD_SETTINGS_KEYS.SONG_CARD_TYPE]
    },
    yupSettings,
    SETTINGS_CATEGORIES.MEDIA
  )
  const currentSettings = methods.watch()
  return (
    <>
      <Room className="mb-distant">
        <SettingsHeader
          title="Song Card visual settings"
          description="Customize the appearance of the song card."
        />
      </Room>
      <Room className="mb-distant">
        <Form methods={methods} onChange={handleChange}>
          <Title size={6}>Type of song card</Title>
          <Radio
            name={SONG_CARD_SETTINGS_KEYS.SONG_CARD_TYPE}
            options={[
              {
                title: "Short",
                value: SONG_CARD_TYPES.SHORT
              },
              {
                title: "Full",
                value: SONG_CARD_TYPES.FULL
              },
              {
                title: "With tooltip",
                value: SONG_CARD_TYPES.TOOLTIP
              }
            ]}
          />
        </Form>
      </Room>
      <HiddenRoom
        isShown={
          currentSettings[SONG_CARD_SETTINGS_KEYS.SONG_CARD_TYPE] ===
          SONG_CARD_TYPES.SHORT
        }
      >
        <ShortFormSettings />
      </HiddenRoom>
      <HiddenRoom
        isShown={
          currentSettings[SONG_CARD_SETTINGS_KEYS.SONG_CARD_TYPE] ===
          SONG_CARD_TYPES.FULL
        }
      >
        <FullFormSettings />
      </HiddenRoom>
      <HiddenRoom
        isShown={
          currentSettings[SONG_CARD_SETTINGS_KEYS.SONG_CARD_TYPE] ===
          SONG_CARD_TYPES.TOOLTIP
        }
      >
        <Stack gap="distant">
          <ShortFormSettings />
          <FullFormSettings />
        </Stack>
      </HiddenRoom>
    </>
  )
}
