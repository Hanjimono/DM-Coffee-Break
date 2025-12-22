"use client"
// system
import * as zod from "zod"
// utils
import { useSettings } from "@/components/Containers/SettingsProvider"
import { useChangedSettings } from "../utils"
// Components
import SettingsHeader from "@/components/Settings/SettingsHeader"
import SongCardFullFormSettings from "./fullFormSettings"
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
import SongCardShortFormSettings from "./shortFormSettings"

const songCardSettingsSchema = zod.object({
  [SONG_CARD_SETTINGS_KEYS.SONG_CARD_TYPE]: zod.string()
})

/**
 * Song card settings form
 */
export default function SongCardSettingsForm() {
  const settings = useSettings()
  const [methods, handleChange] = useChangedSettings(
    songCardSettingsSchema,
    {
      [SONG_CARD_SETTINGS_KEYS.SONG_CARD_TYPE]: settings.media.songs.card.type
    },
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
        <SongCardShortFormSettings />
      </HiddenRoom>
      <HiddenRoom
        isShown={
          currentSettings[SONG_CARD_SETTINGS_KEYS.SONG_CARD_TYPE] ===
          SONG_CARD_TYPES.FULL
        }
      >
        <SongCardFullFormSettings />
      </HiddenRoom>
      <HiddenRoom
        isShown={
          currentSettings[SONG_CARD_SETTINGS_KEYS.SONG_CARD_TYPE] ===
          SONG_CARD_TYPES.TOOLTIP
        }
      >
        <Stack gap="distant">
          <SongCardShortFormSettings />
          <SongCardFullFormSettings />
        </Stack>
      </HiddenRoom>
    </>
  )
}
