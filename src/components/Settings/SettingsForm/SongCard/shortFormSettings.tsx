"use client"
// System
import * as zod from "zod"
import { useMemo } from "react"
// Components
// Ui
import Checkbox from "@/ui/Form/Checkbox"
import Select from "@/ui/Form/Select"
import Room, { HiddenRoom } from "@/ui/Layout/Room"
import Title from "@/ui/Presentation/Title"
import Form from "@/ui/Form/Form"
import FormElementWrapper, {
  FormElementNestedWrapper
} from "@/ui/Form/FormElementWrapper"
// Constants
import { SONG_EXAMPLE } from "@cross/constants/media"
import { SONG_CARD_SETTINGS_KEYS } from "@cross/constants/settingsMedia"
import { SETTINGS_CATEGORIES } from "@cross/constants/settingsCategories"
import { useSettings } from "@/components/Containers/SettingsProvider"
import { useChangedSettings } from "../utils"

const songCardShortSettingsSchema = zod.object({
  [SONG_CARD_SETTINGS_KEYS.CARD_SHORT_PRIMARY]: zod.string(),
  [SONG_CARD_SETTINGS_KEYS.CARD_SHORT_HIDE_SECONDARY]: zod.boolean(),
  [SONG_CARD_SETTINGS_KEYS.CARD_SHORT_SECONDARY]: zod.string()
})

/**
 * Settings for short form of song card
 */
export default function SongCardShortFormSettings() {
  const settings = useSettings()
  const [methods, handleChange] = useChangedSettings(
    songCardShortSettingsSchema,
    {
      [SONG_CARD_SETTINGS_KEYS.CARD_SHORT_PRIMARY]:
        settings.media.songs.card.short.primary,
      [SONG_CARD_SETTINGS_KEYS.CARD_SHORT_HIDE_SECONDARY]:
        settings.media.songs.card.short.isHideSecondary,
      [SONG_CARD_SETTINGS_KEYS.CARD_SHORT_SECONDARY]:
        settings.media.songs.card.short.secondary
    },
    SETTINGS_CATEGORIES.MEDIA
  )
  const currentSettings = methods.watch()
  const secondaryOptions = useMemo(() => {
    if (
      currentSettings &&
      currentSettings[SONG_CARD_SETTINGS_KEYS.CARD_SHORT_PRIMARY] === "title"
    ) {
      return [
        { value: "comment", title: "Comment" },
        { value: "author", title: "Author" }
      ]
    }
    return [
      { value: "title", title: "Title" },
      { value: "author", title: "Author" }
    ]
  }, [currentSettings])
  return (
    <Room>
      <Form methods={methods} onChange={handleChange}>
        <FormElementNestedWrapper>
          <Room>
            <Room className="mb-same-level">
              <Title className="mb-tight" size={6}>
                Short card settings
              </Title>
            </Room>
            <Room className="mb-same-level">
              <FormElementWrapper>
                <Select
                  name={SONG_CARD_SETTINGS_KEYS.CARD_SHORT_PRIMARY}
                  label="Primary text"
                  options={[
                    { value: "title", title: "Title" },
                    { value: "comment", title: "Comment" }
                  ]}
                />
              </FormElementWrapper>
            </Room>
            <Room className="mb-same-level">
              <FormElementWrapper>
                <Checkbox
                  name={SONG_CARD_SETTINGS_KEYS.CARD_SHORT_HIDE_SECONDARY}
                  label="Hide secondary text"
                  checked={
                    currentSettings &&
                    currentSettings[
                      SONG_CARD_SETTINGS_KEYS.CARD_SHORT_HIDE_SECONDARY
                    ]
                  }
                />
              </FormElementWrapper>
            </Room>
            <HiddenRoom
              isShown={
                !currentSettings ||
                currentSettings[
                  SONG_CARD_SETTINGS_KEYS.CARD_SHORT_HIDE_SECONDARY
                ]
              }
              mode="wait"
            >
              <FormElementWrapper>
                <Select
                  name={SONG_CARD_SETTINGS_KEYS.CARD_SHORT_SECONDARY}
                  label="Secondary text"
                  options={secondaryOptions}
                />
              </FormElementWrapper>
            </HiddenRoom>
          </Room>
        </FormElementNestedWrapper>
      </Form>
    </Room>
  )
}
