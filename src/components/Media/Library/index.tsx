"use client"
// ui
import Text from "@/ui/Presentation/Text"
import Room from "@/ui/Layout/Room"
// Styles and types
import styles from "./styles.module.scss"

export default function Library() {
  return (
    <Room className={styles["media-library-container"]}>
      <div className={styles["library-empty"]}>
        <Text>
          No media files found. You can add media files by clicking the
          &quot;Add Song&quot; button above.
        </Text>
      </div>
    </Room>
  )
}
