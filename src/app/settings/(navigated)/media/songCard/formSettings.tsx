"use client"
import { useStore } from "@/store"
import Radio from "@/ui/Form/Radio"
// ui
import Room, { HiddenRoom } from "@/ui/Layout/Room"
import Divider from "@/ui/Presentation/Divider"
import Text from "@/ui/Presentation/Text"
import Title from "@/ui/Presentation/Title"
import { SONG_CARD_TYPES } from "@cross/constants/settingsMedia"
import {
  AVAILABLE_SONG_CARD_SETTINGS,
  SONG_CARD_SETTINGS
} from "@cross/types/database/settings/media"
import { useEffect, useState } from "react"
import ShortFormSettings from "./shortFormSettings"
import FullFormSettings from "./fullFormSettings"
import { formateSettingsFormAfterChange } from "./utils"
import { useDatabase, useSettings } from "@/components/Helpers/Hooks"

export default function SongCardSettingsForm() {
  const [dbSettings, updateDbSettings] = useSettings()
  const [currentSettings, setCurrentSettings] = useState<
    SONG_CARD_SETTINGS | undefined
  >(dbSettings.media.songCard)
  const database = useDatabase()
  const errorSnack = useStore((state) => state.errorSnack)
  useEffect(() => {
    const fetchSettings = async () => {
      const dbSettings = await database.settings.songCard.get()
      if (!!dbSettings) {
        setCurrentSettings(dbSettings)
      }
    }
    if (!currentSettings && !!database) {
      fetchSettings()
    }
  }, [currentSettings, database])
  const changeSomeSetting = async (
    key: AVAILABLE_SONG_CARD_SETTINGS,
    value: string
  ) => {
    const previousSetting = (currentSettings && currentSettings[key]) || ""
    setCurrentSettings(
      formateSettingsFormAfterChange(key, value, currentSettings)
    )
    let isSaved = false
    if (!!database) {
      isSaved = await database.settings.songCard.setOne(key, value)
    }
    if (!isSaved) {
      errorSnack("Failed to save the setting")
      setCurrentSettings({
        ...currentSettings,
        [key]: previousSetting
      })
      return
    }
    updateDbSettings()
  }
  const type = currentSettings?.["song-card-type"] || SONG_CARD_TYPES.SHORT
  return (
    <>
      <Room bottomGap="same-level">
        <Title bottomGap="same">Song Card visual settings</Title>
        <Text>You can customize the appearance of the song card here.</Text>
        <Divider bottomGap="close" />
      </Room>
      <Room bottomGap="same-level">
        <Title bottomGap="same" size={6}>
          Type of song card
        </Title>
        <Radio
          name="song-card-type"
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
          value={type}
          onChange={(name, value) => changeSomeSetting("song-card-type", value)}
        />
        <Divider bottomGap="same" />
      </Room>
      <HiddenRoom
        isShown={type !== SONG_CARD_TYPES.FULL}
        bottomGap="same-level"
      >
        <ShortFormSettings
          settings={currentSettings}
          handleChange={changeSomeSetting}
        />
      </HiddenRoom>
      <HiddenRoom isShown={type !== SONG_CARD_TYPES.SHORT}>
        <FullFormSettings
          settings={currentSettings}
          handleChange={changeSomeSetting}
        />
      </HiddenRoom>
    </>
  )
}
