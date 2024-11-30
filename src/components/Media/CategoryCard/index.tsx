// System
import { useCallback, useState } from "react"
import { cx } from "class-variance-authority"
import { twMerge } from "tailwind-merge"
// Components
import { useDatabase } from "@/components/Helpers/Hooks"
// Ui
import Brick from "@/ui/Layout/Brick"
import Text from "@/ui/Presentation/Text"
import Loader from "@/ui/Presentation/Loader"
import Divider from "@/ui/Presentation/Divider"
import Beam from "@/ui/Layout/Beam"
import Button from "@/ui/Actions/Button"
// Styles and types
import { MediaCategoryCardProps } from "./types"

function MediaCategoryCard({ className, data }: MediaCategoryCardProps) {
  const calculatedClassNames = twMerge(
    cx("media-category rounded-lg overflow-hidden", className)
  )
  const database = useDatabase()
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
      <Brick noPadding className={""}>
        <div
          style={{ background: data.hex }}
          className={"p-2 h-14 flex items-center box-border cursor-pointer"}
          onClick={() => openSongList(!opened)}
        >
          <Beam contentJustify="between" contentAlign="center" withoutWrap>
            <Text type="fit-line" bold>
              {data.title}
            </Text>
            {opened && <Button>Add song</Button>}
          </Beam>
        </div>
        {opened && (
          <div>
            <Divider orientation="horizontal" gap="same" bottomGap="same" />
          </div>
        )}
        {opened && (
          <div
            className={"p-4 min-h-36 max-h-96 flex flex-col overflow-y-auto"}
          >
            {loading && (
              <div className="w-full flex-1 h-full flex justify-center items-center">
                <Loader size="lg" />
              </div>
            )}
            {!loading && <div>11111</div>}
          </div>
        )}
      </Brick>
    </div>
  )
}
export default MediaCategoryCard
