// System
import * as yup from "yup"
// Components
import SongCard from "@/components/Media/SongCard"
import { useSettings, useSettingsFormOnFly } from "@/components/Helpers/Hooks"
// Ui
import Select from "@/ui/Form/Select"
import Beam from "@/ui/Layout/Beam"
import Pillar from "@/ui/Layout/Pillar"
import Room from "@/ui/Layout/Room"
import Title from "@/ui/Presentation/Title"
import Form from "@/ui/Form/Form"
// Constants
import { SONG_EXAMPLE } from "@cross/constants/media"
import { SONG_CARD_SETTINGS_KEYS } from "@cross/constants/settingsMedia"
import { SETTINGS_CATEGORIES } from "@cross/constants/settingsCategories"
import Stack from "@/ui/Layout/Stack"
import Spacer from "@/ui/Layout/Spacer"

const yupSettings = {
  [SONG_CARD_SETTINGS_KEYS.CARD_FULL_PRIMARY]: yup.string().required(),
  [SONG_CARD_SETTINGS_KEYS.CARD_FULL_SECONDARY]: yup.string().required()
}

export default function FullFormSettings() {
  const settings = useSettings()
  const [methods, handleChange] = useSettingsFormOnFly(
    {
      [SONG_CARD_SETTINGS_KEYS.CARD_FULL_PRIMARY]:
        settings.media.songCard[SONG_CARD_SETTINGS_KEYS.CARD_FULL_PRIMARY],
      [SONG_CARD_SETTINGS_KEYS.CARD_FULL_SECONDARY]:
        settings.media.songCard[SONG_CARD_SETTINGS_KEYS.CARD_FULL_SECONDARY]
    },
    yupSettings,
    SETTINGS_CATEGORIES.MEDIA
  )
  const formattedChange = async (name: string, value: string) => {
    await handleChange(name, value, true)
    if (
      name === SONG_CARD_SETTINGS_KEYS.CARD_FULL_PRIMARY &&
      value === "title"
    ) {
      await handleChange(
        SONG_CARD_SETTINGS_KEYS.CARD_FULL_SECONDARY,
        "comment",
        true,
        true
      )
    } else {
      await handleChange(
        SONG_CARD_SETTINGS_KEYS.CARD_FULL_SECONDARY,
        "title",
        true,
        true
      )
    }
  }
  return (
    <Room>
      <Title className="mb-same-level" size={6}>
        Full card settings
      </Title>
      <Beam cols={12}>
        <Pillar sm={7}>
          <Form methods={methods} onChange={formattedChange}>
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
        <Pillar sm={4}>
          <SongCard info={SONG_EXAMPLE} type="full" isEdit />
        </Pillar>
      </Beam>
    </Room>
  )
}
