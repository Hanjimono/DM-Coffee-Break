// System
import * as yup from "yup"
import { useMemo } from "react"
// Components
import { useSettings, useSettingsFormOnFly } from "@/components/Helpers/Hooks"
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

const yupSettings = {
  [SONG_CARD_SETTINGS_KEYS.CARD_SHORT_PRIMARY]: yup.string().required(),
  [SONG_CARD_SETTINGS_KEYS.CARD_SHORT_HIDE_SECONDARY]: yup.string().required(),
  [SONG_CARD_SETTINGS_KEYS.CARD_SHORT_SECONDARY]: yup.string().required()
}

/**
 * Settings for short form of song card
 */
export default function ShortFormSettings() {
  const settings = useSettings()
  const [methods, handleChange] = useSettingsFormOnFly(
    {
      [SONG_CARD_SETTINGS_KEYS.CARD_SHORT_PRIMARY]:
        settings.media.songs.card.short.primary,
      [SONG_CARD_SETTINGS_KEYS.CARD_SHORT_HIDE_SECONDARY]:
        settings.media.songs.card.short.isHideSecondary,
      [SONG_CARD_SETTINGS_KEYS.CARD_SHORT_SECONDARY]:
        settings.media.songs.card.short.secondary
    },
    yupSettings,
    SETTINGS_CATEGORIES.MEDIA
  )
  const currentSettings = methods.watch()
  const formattedChange = async (name: string, value: string) => {
    handleChange(name, value, true)
    if (
      name === SONG_CARD_SETTINGS_KEYS.CARD_SHORT_PRIMARY &&
      currentSettings[SONG_CARD_SETTINGS_KEYS.CARD_SHORT_SECONDARY] !== "author"
    ) {
      if (value === "title") {
        handleChange(
          SONG_CARD_SETTINGS_KEYS.CARD_SHORT_SECONDARY,
          "comment",
          true,
          true
        )
      } else if (value === "comment") {
        handleChange(
          SONG_CARD_SETTINGS_KEYS.CARD_SHORT_SECONDARY,
          "title",
          true,
          true
        )
      }
    }
  }
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
      <Form methods={methods} onChange={formattedChange}>
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
