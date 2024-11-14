// System
import { useCallback, useContext, useState } from "react"
import clsx from "clsx"
// Components
import { DatabaseContext } from "@/components/Containers/DatabaseProvider"
// Ui
import Brick from "@/ui/Layout/Brick"
import Text from "@/ui/Presentation/Text"
import Loader from "@/ui/Presentation/Loader"
import Divider from "@/ui/Presentation/Divider"
import Beam from "@/ui/Layout/Beam"
import Button from "@/ui/Actions/Button"
// Styles and types
import { MediaCategoryCardProps } from "./types"
import styles from "./styles.module.scss"

function MediaCategoryCard({ className, data }: MediaCategoryCardProps) {
  const calculatedClassNames = clsx(styles["media-category-card"], className)
  const database = useContext(DatabaseContext)
  const [opened, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [songs, setSongs] = useState([])
  const openSongList = useCallback(async (isOpen: boolean) => {
    setOpen(isOpen)
    if (isOpen) {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // const songs = await database.getCategorySongs(data.id)
      // setSongs(songs)
      setLoading(false)
    }
  }, [])
  return (
    <div className={calculatedClassNames}>
      <Brick noPadding className={styles["media-category-block"]}>
        <div>
          <div
            style={{ background: data.hex }}
            className={styles["media-category-title"]}
            onClick={() => openSongList(!opened)}
          >
            <Beam contentJustify="between" contentAlign="center" withoutWrap>
              <Text type="fit-line" bold>
                {data.title}
              </Text>
              {opened && <Button>Add song</Button>}
            </Beam>
          </div>
        </div>
        {opened && (
          <div>
            <Divider orientation="horizontal" gap="same" bottomGap="same" />
          </div>
        )}
        {opened && (
          <div>
            <div className={styles["media-category-content"]}>
              {loading && <Loader />}
              {!loading && <div>11111</div>}
            </div>
          </div>
        )}
      </Brick>
    </div>
  )
}
export default MediaCategoryCard
