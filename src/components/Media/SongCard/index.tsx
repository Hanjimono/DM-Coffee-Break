// System
// Constants
import { SONG_CARD_TYPES } from "@cross/constants/settingsMedia"
// Styles and types
import { SongCardProps, SongCardType } from "./types"
import ShortSongCard from "./shortSongCard"
import BigSongCard from "./bigSongCard"
import { useSettings } from "@/components/Helpers/Hooks"

function SongCard({ className, info, type, ...rest }: SongCardProps) {
  const settings = useSettings()
  if (!type) {
    type = settings.media.songs.card.type as SongCardType
  }
  if (type === SONG_CARD_TYPES.FULL) {
    return <BigSongCard info={info} {...rest} />
  }
  return <ShortSongCard info={info} {...rest} />
}
export default SongCard
