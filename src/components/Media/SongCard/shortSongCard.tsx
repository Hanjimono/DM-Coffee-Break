"use client"
// System
import clsx from "clsx"
import { motion } from "framer-motion"
// Ui
import Beam from "@/ui/Layout/Beam"
import Button from "@/ui/Actions/Button"
import SmartImage from "@/ui/Presentation/SmartImage"
import Text from "@/ui/Presentation/Text"

// Styles and types
import { SongCardProps } from "./types"
import styles from "./styles.module.scss"
import { SONG_CARD_SETTINGS_KEYS } from "@cross/constants/settingsMedia"

function ShortSongCard({ className, info, settings, isEdit }: SongCardProps) {
  const calculatedClassNames = clsx(styles["short-song-card"], className)
  const primary =
    settings && settings[SONG_CARD_SETTINGS_KEYS.CARD_SHORT_PRIMARY] === "title"
      ? info.title
      : info.comment
  const secondary =
    settings &&
    settings[SONG_CARD_SETTINGS_KEYS.CARD_SHORT_SECONDARY] === "title"
      ? info.title
      : settings &&
          settings[SONG_CARD_SETTINGS_KEYS.CARD_SHORT_SECONDARY] === "comment"
        ? info.comment
        : info.artist
  const hideSecondary =
    settings &&
    settings[SONG_CARD_SETTINGS_KEYS.CARD_SHORT_HIDE_SECONDARY] === "true"
  return (
    <motion.div
      layout
      className={calculatedClassNames}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.9 }}
      exit={{ opacity: 0 }}
      whileHover={isEdit ? undefined : { scale: 1.01, opacity: 1 }}
    >
      <Beam withoutGap withoutWrap contentJustify="center">
        <div className={styles["short-song-card-image"]}>
          <SmartImage src={info.thumbnail} alt={info.title} />
          {!isEdit && (
            <Button
              className={styles["short-song-card-play"]}
              success
              icon="play_arrow"
            />
          )}
        </div>
        <div className={styles["short-song-card-info"]}>
          <div className={styles["short-song-card-primary"]}>
            <Text type="fit-line" bold>
              {primary || info.title}
            </Text>
          </div>
          {!hideSecondary && secondary && (
            <div className={styles["short-song-card-secondary"]}>
              <Text type="fit-line" size="small">
                {secondary}
              </Text>
            </div>
          )}
          {!isEdit && (
            <div className={styles["short-song-card-actions"]}>
              <Button
                className={styles["short-song-card-actions-button"]}
                icon="edit"
                secondary
                text
              />
              <Button
                className={styles["short-song-card-actions-button"]}
                icon="delete"
                remove
                text
              />
            </div>
          )}
        </div>
      </Beam>
    </motion.div>
  )
}
export default ShortSongCard
