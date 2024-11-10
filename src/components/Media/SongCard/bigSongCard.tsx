// System
import clsx from "clsx"
import { motion } from "framer-motion"
// ui
import Beam from "@/ui/Layout/Beam"
import Title from "@/ui/Presentation/Title"
import SmartImage from "@/ui/Presentation/SmartImage"
import Text from "@/ui/Presentation/Text"
import Button from "@/ui/Actions/Button"
// Styles and types
import { SongCardProps } from "./types"
import styles from "./styles.module.scss"
import { SONG_CARD_SETTINGS_KEYS } from "@cross/constants/settingsMedia"

function BigSongCard({ info, className, settings, isEdit }: SongCardProps) {
  const calculatedClassNames = clsx(
    styles["big-song-card-container"],
    className
  )
  const primary =
    settings && settings[SONG_CARD_SETTINGS_KEYS.CARD_FULL_PRIMARY] === "title"
      ? info.title
      : info.comment
  const secondary =
    settings &&
    settings[SONG_CARD_SETTINGS_KEYS.CARD_FULL_SECONDARY] === "title"
      ? info.title
      : settings &&
          settings[SONG_CARD_SETTINGS_KEYS.CARD_FULL_SECONDARY] === "comment"
        ? info.comment
        : info.artist
  return (
    <motion.div
      className={calculatedClassNames}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.9 }}
      exit={{ opacity: 0 }}
      whileHover={isEdit ? undefined : { scale: 1.01, opacity: 1 }}
    >
      <Beam className={styles["big-song-card-primary"]}>
        <Text type="fit-line" bold>
          {primary || info.title}
        </Text>
        {!isEdit && (
          <div className={styles["big-song-card-actions"]}>
            <Button
              className={styles["big-song-card-actions-button"]}
              icon="edit"
              secondary
            />
            <Button
              className={styles["big-song-card-actions-button"]}
              icon="delete"
              remove
            />
          </div>
        )}
      </Beam>
      <Beam className={styles["big-song-card-image"]} bottomGap="almost-same">
        <SmartImage src={info.thumbnail} alt={info.title} />
        {!isEdit && (
          <Button
            className={styles["big-song-card-play"]}
            success
            icon="play_arrow"
          />
        )}
      </Beam>
      <Beam className={styles["big-song-card-secondary"]}>
        <Text type="fit-line">{secondary}</Text>
      </Beam>
      <Beam>
        <Text type="fit-line" size="small">
          Artist: {info.artist}
        </Text>
      </Beam>
    </motion.div>
  )
}
export default BigSongCard
