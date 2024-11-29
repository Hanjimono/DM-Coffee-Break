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

export default function FullFormSettings({
  settings,
  handleChange
}: {
  settings: SONG_CARD_SETTINGS | undefined
  handleChange: (key: AVAILABLE_SONG_CARD_SETTINGS, value: string) => void
}) {
  const secondaryOptions = useMemo(() => {
    if (
      settings &&
      settings[SONG_CARD_SETTINGS_KEYS.CARD_FULL_PRIMARY] === "title"
    ) {
      return [{ value: "comment", title: "Comment" }]
    }
    return [{ value: "title", title: "Title" }]
  }, [settings])
  return (
    <Room>
      <Title bottomGap="same" size={6}>
        Full card settings
      </Title>
      <Beam bottomGap="same-level">
        <Pillar sm={7}>
          <Select
            className="mb-same-level"
            name={SONG_CARD_SETTINGS_KEYS.CARD_FULL_PRIMARY}
            label="Primary text"
            options={[
              { value: "title", title: "Title" },
              { value: "comment", title: "Comment" }
            ]}
            value={
              (settings &&
                settings[SONG_CARD_SETTINGS_KEYS.CARD_FULL_PRIMARY]) ||
              "title"
            }
            onChange={(name, value) =>
              handleChange(name as AVAILABLE_SONG_CARD_SETTINGS, value)
            }
          />
          <Select
            name={SONG_CARD_SETTINGS_KEYS.CARD_FULL_SECONDARY}
            label="Secondary text"
            options={secondaryOptions}
            value={
              (settings &&
                settings[SONG_CARD_SETTINGS_KEYS.CARD_FULL_SECONDARY]) ||
              "title"
            }
            onChange={(name, value) =>
              handleChange(name as AVAILABLE_SONG_CARD_SETTINGS, value)
            }
            disabled
          />
        </Pillar>
        <Pillar sm={5}>
          <Beam contentJustify="center">
            <SongCard
              info={SONG_EXAMPLE}
              type="full"
              settings={settings}
              isEdit
            />
          </Beam>
        </Pillar>
      </Beam>
    </Room>
  )
}
