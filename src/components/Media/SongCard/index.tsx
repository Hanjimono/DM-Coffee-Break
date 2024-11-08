// System
import clsx from "clsx"
// Constants
import { SONG_CARD_TYPES } from "@cross/constants/settingsMedia"
// Styles and types
import { SongCardProps } from "./types"
import styles from "./styles.module.scss"
import ShortSongCard from "./shortSongCard"
import BigSongCard from "./bigSongCard"

function SongCard({ className, info }: SongCardProps) {
  const calculatedClassNames = clsx(styles["song-card-container"], className)
  const type = SONG_CARD_TYPES.SHORT
  if (type === SONG_CARD_TYPES.SHORT) {
    return <ShortSongCard info={info} />
  }
  return <BigSongCard info={info} />
}
export default SongCard
