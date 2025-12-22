"use client"
// System
import * as zod from "zod"
// Utils
import { useSettings } from "@/components/Containers/SettingsProvider"
import { useChangedSettings } from "../utils"
// Ui
import Select from "@/ui/Form/Select"
import Beam from "@/ui/Layout/Beam"
import Pillar from "@/ui/Layout/Pillar"
import Room from "@/ui/Layout/Room"
import Title from "@/ui/Presentation/Title"
import Form from "@/ui/Form/Form"
import Spacer from "@/ui/Layout/Spacer"
// Constants
import { SONG_CARD_SETTINGS_KEYS } from "@cross/constants/settingsMedia"
import { SETTINGS_CATEGORIES } from "@cross/constants/settingsCategories"

const songCardFullSettingsSchema = zod.object({
  [SONG_CARD_SETTINGS_KEYS.CARD_FULL_PRIMARY]: zod.string(),
  [SONG_CARD_SETTINGS_KEYS.CARD_FULL_SECONDARY]: zod.string()
})

/**
 * Settings for full form of song card
 */
export default function SongCardFullFormSettings() {
  const settings = useSettings()
  const [methods, handleChange] = useChangedSettings(
    songCardFullSettingsSchema,
    {
      [SONG_CARD_SETTINGS_KEYS.CARD_FULL_PRIMARY]:
        settings.media.songs.card.full.primary,
      [SONG_CARD_SETTINGS_KEYS.CARD_FULL_SECONDARY]:
        settings.media.songs.card.full.secondary
    },
    SETTINGS_CATEGORIES.MEDIA
  )
  return (
    <Room>
      <Title className="mb-same-level" size={6}>
        Full card settings
      </Title>
      <Beam cols={12}>
        <Pillar sm={7}>
          <Form methods={methods} onChange={handleChange}>
            <Select
              className="mb-same-level"
              name={SONG_CARD_SETTINGS_KEYS.CARD_FULL_PRIMARY}
              label="Primary text"
              options={[
                { value: "title", title: "Title" },
                { value: "comment", title: "Comment" }
              ]}
            />
            <Select
              name={SONG_CARD_SETTINGS_KEYS.CARD_FULL_SECONDARY}
              label="Secondary text"
              options={[
                { value: "title", title: "Title" },
                { value: "comment", title: "Comment" }
              ]}
              disabled
            />
          </Form>
        </Pillar>
        <Spacer />
      </Beam>
    </Room>
  )
}
