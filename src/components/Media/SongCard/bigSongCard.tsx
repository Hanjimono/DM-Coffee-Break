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

function BigSongCard({ info, className }: SongCardProps) {
  const calculatedClassNames = clsx(
    styles["big-song-card-container"],
    className
  )
  const primary = info.title
  const secondary = info.comment
  return (
    <motion.div
      className={calculatedClassNames}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.9 }}
      exit={{ opacity: 0 }}
      whileHover={{ scale: 1.01, opacity: 1 }}
    >
      <Beam className={styles["big-song-card-primary"]}>
        <Text type="fit-line" bold>
          {primary}
        </Text>
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
      </Beam>
      <Beam className={styles["big-song-card-image"]} bottomGap="almost-same">
        <SmartImage src={info.thumbnail} alt={info.title} />
        <Button
          className={styles["big-song-card-play"]}
          success
          icon="play_arrow"
        />
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
