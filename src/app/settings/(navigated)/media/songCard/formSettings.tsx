"use client"
// system
import * as yup from "yup"
// Components
import SettingsHeader from "@/components/Settings/SettingsHeader"
import ShortFormSettings from "./shortFormSettings"
import FullFormSettings from "./fullFormSettings"
import { useSettings, useSettingsFormOnFly } from "@/components/Helpers/Hooks"
// ui
import Radio from "@/ui/Form/Radio"
import Room, { HiddenRoom } from "@/ui/Layout/Room"
import Title from "@/ui/Presentation/Title"
import Form from "@/ui/Form/Form"
import Stack from "@/ui/Layout/Stack"
// Constants
import {
  SONG_CARD_SETTINGS_KEYS,
  SONG_CARD_TYPES
} from "@cross/constants/settingsMedia"
import { SETTINGS_CATEGORIES } from "@cross/constants/settingsCategories"

const yupSettings = {
  [SONG_CARD_SETTINGS_KEYS.SONG_CARD_TYPE]: yup.number().required()
}

/**
 * Main component for song card settings
 */
export default function SongCardSettingsForm() {
  const settings = useSettings()
  const [methods, handleChange] = useSettingsFormOnFly(
    {
      [SONG_CARD_SETTINGS_KEYS.SONG_CARD_TYPE]: settings.media.songs.card.type
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
