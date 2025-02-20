"use client"
// system
import * as yup from "yup"
import { useStore } from "@/store"
import Radio from "@/ui/Form/Radio"
// ui
import Room, { HiddenRoom } from "@/ui/Layout/Room"
import Divider from "@/ui/Presentation/Divider"
import Text from "@/ui/Presentation/Text"
import Title from "@/ui/Presentation/Title"
import {
  SONG_CARD_SETTINGS_KEYS,
  SONG_CARD_TYPES
} from "@cross/constants/settingsMedia"
import {
  AVAILABLE_SONG_CARD_SETTINGS,
  SONG_CARD_SETTINGS
} from "@cross/types/database/settings/media"
import { useEffect, useState } from "react"
import ShortFormSettings from "./shortFormSettings"
import FullFormSettings from "./fullFormSettings"
import { formateSettingsFormAfterChange } from "./utils"
import {
  useDatabase,
  useSettings,
  useSettingsFormOnFly,
  useUpdateSettings
} from "@/components/Helpers/Hooks"
import Form from "@/ui/Form/Form"
import { SETTINGS_CATEGORIES } from "@cross/constants/settingsCategories"

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
      <Room bottomGap="same-level">
        <Title bottomGap="same">Song Card visual settings</Title>
        <Text>You can customize the appearance of the song card here.</Text>
        <Divider bottomGap="close" />
      </Room>
      <Room bottomGap="same-level">
        <Form methods={methods} onChange={handleChange}>
          <Title bottomGap="same" size={6}>
            Type of song card
          </Title>
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
        <Divider bottomGap="same" />
      </Room>
      <HiddenRoom
        isShown={
          currentSettings[SONG_CARD_SETTINGS_KEYS.SONG_CARD_TYPE] !==
          SONG_CARD_TYPES.FULL
        }
        bottomGap="same-level"
      >
        <ShortFormSettings />
      </HiddenRoom>
      <HiddenRoom
        isShown={
          currentSettings[SONG_CARD_SETTINGS_KEYS.SONG_CARD_TYPE] !==
          SONG_CARD_TYPES.SHORT
        }
      >
        <FullFormSettings />
      </HiddenRoom>
    </>
  )
}
