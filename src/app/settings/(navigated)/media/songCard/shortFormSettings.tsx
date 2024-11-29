import SongCard from "@/components/Media/SongCard"
import Checkbox from "@/ui/Form/Checkbox"
import Select from "@/ui/Form/Select"
import Beam from "@/ui/Layout/Beam"
import Pillar from "@/ui/Layout/Pillar"
import Room, { HiddenRoom } from "@/ui/Layout/Room"
import Title from "@/ui/Presentation/Title"
import { SONG_EXAMPLE } from "@cross/constants/media"
import { SONG_CARD_SETTINGS_KEYS } from "@cross/constants/settingsMedia"
import {
  AVAILABLE_SONG_CARD_SETTINGS,
  SONG_CARD_SETTINGS
} from "@cross/types/database/settings/media"
import { useMemo } from "react"

export default function ShortFormSettings({
  settings,
  handleChange
}: {
  settings: SONG_CARD_SETTINGS | undefined
  handleChange: (key: AVAILABLE_SONG_CARD_SETTINGS, value: string) => void
}) {
  const secondaryOptions = useMemo(() => {
    if (
      settings &&
      settings[SONG_CARD_SETTINGS_KEYS.CARD_SHORT_PRIMARY] === "title"
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
  }, [settings])
  return (
    <Room>
      <Room>
        <Title bottomGap="same" size={6}>
          Short card settings
        </Title>
        <Beam bottomGap="same-level">
          <SongCard
            info={SONG_EXAMPLE}
            type="short"
            settings={settings}
            isEdit
          />
        </Beam>
      </Room>
      <Room>
        <Select
          name={SONG_CARD_SETTINGS_KEYS.CARD_SHORT_PRIMARY}
          label="Primary text"
          options={[
            { value: "title", title: "Title" },
            { value: "comment", title: "Comment" }
          ]}
          value={
            (settings &&
              settings[SONG_CARD_SETTINGS_KEYS.CARD_SHORT_PRIMARY]) ||
            "title"
          }
          onChange={(name, value) =>
            handleChange(name as AVAILABLE_SONG_CARD_SETTINGS, value)
          }
        />
      </Room>
      <Room>
        <Checkbox
          name={SONG_CARD_SETTINGS_KEYS.CARD_SHORT_HIDE_SECONDARY}
          label="Hide secondary text"
          checked={
            (settings &&
              settings[SONG_CARD_SETTINGS_KEYS.CARD_SHORT_HIDE_SECONDARY] ===
                "true") ||
            false
          }
          onChange={(name, value) =>
            handleChange(name as AVAILABLE_SONG_CARD_SETTINGS, String(value))
          }
        />
      </Room>
      <HiddenRoom
        isShown={
          !settings ||
          settings[SONG_CARD_SETTINGS_KEYS.CARD_SHORT_HIDE_SECONDARY] !== "true"
        }
      >
        <Select
          name={SONG_CARD_SETTINGS_KEYS.CARD_SHORT_SECONDARY}
          label="Secondary text"
          options={secondaryOptions}
          value={
            (settings &&
              settings[SONG_CARD_SETTINGS_KEYS.CARD_SHORT_SECONDARY]) ||
            "author"
          }
          onChange={(name, value) =>
            handleChange(name as AVAILABLE_SONG_CARD_SETTINGS, value)
          }
        />
      </HiddenRoom>
    </Room>
  )
}
