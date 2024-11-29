// System
// Constants
import { SONG_CARD_TYPES } from "@cross/constants/settingsMedia"
// Styles and types
import { SongCardProps } from "./types"
import ShortSongCard from "./shortSongCard"
import BigSongCard from "./bigSongCard"

function SongCard({ className, info, type, ...rest }: SongCardProps) {
  if (type === SONG_CARD_TYPES.SHORT) {
    return <ShortSongCard info={info} {...rest} />
  }
  return <BigSongCard info={info} {...rest} />
}
export default SongCard
