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
function ShortSongCard({ className, info }: SongCardProps) {
  const calculatedClassNames = clsx(styles["short-song-card"], className)
  const primary = info.title
  const secondary = info.comment
  return (
    <motion.div
      layout
      className={calculatedClassNames}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.9 }}
      exit={{ opacity: 0 }}
      whileHover={{ scale: 1.01, opacity: 1 }}
    >
      <Beam withoutGap withoutWrap contentJustify="center">
        <div className={styles["short-song-card-image"]}>
          <SmartImage src={info.thumbnail} alt={info.title} />
          <Button
            className={styles["short-song-card-play"]}
            success
            icon="play_arrow"
          />
        </div>
        <div className={styles["short-song-card-info"]}>
          <div className={styles["short-song-card-primary"]}>
            <Text type="fit-line" bold>
              {primary}
            </Text>
          </div>
          <div className={styles["short-song-card-secondary"]}>
            <Text type="fit-line" size="small">
              {secondary}
            </Text>
          </div>
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
        </div>
      </Beam>
    </motion.div>
  )
}
export default ShortSongCard
