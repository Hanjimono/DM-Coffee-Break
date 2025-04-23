// System
import { useCallback, useMemo, useState } from "react"
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
import { SongInfo } from "@cross/types/database/media"
import SongCard from "../SongCard"
import Title from "@/ui/Presentation/Title"
import { MEDIA_CATEGORY_DEFAULT_SONGS_COUNT } from "@cross/constants/media"
import SmartImage from "@/ui/Presentation/SmartImage"

function MediaCategoryCard({ className, data }: MediaCategoryCardProps) {
  const calculatedClassNames = twMerge(
    cx(
      "media-category rounded-lg overflow-hidden min-w-full cursor-pointer",
      className
    )
  )
  const database = useDatabase()
  const [opened, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [songs, setSongs] = useState<SongInfo[]>([])
  const restSongsCount = useMemo(() => {
    if (data.songsCount < MEDIA_CATEGORY_DEFAULT_SONGS_COUNT) {
      return 0
    }
    return data.songsCount - MEDIA_CATEGORY_DEFAULT_SONGS_COUNT
  }, [data.songsCount])
  const openSongList = useCallback(
    async (event: React.MouseEvent, isOpen: boolean) => {
      setOpen(isOpen)
      if (isOpen) {
        setLoading(true)
        if (data.id) {
          const songs = await database.media.getSongs(data.id)
          setSongs(songs)
        } else {
          const songs = await database.media.getUnassignedSongs()
          setSongs(songs)
        }
        setLoading(false)
      }
    },
    [database, data.id]
  )
  return (
    <div onClick={(e) => openSongList(e, !opened)}>
      <Brick className={calculatedClassNames} noPadding durability={4}>
        <Beam withoutGap withoutWrap>
          <div className="bookmark-part min-w-9 min-h-full relative">
            <div
              style={{ background: data.hex }}
              className="min-w-1.5 max-w-1.5 min-h-full right-0 absolute"
            ></div>
          </div>
          <div className="content-part px-5 py-3 flex-1 flex flex-col">
            <div className="border-b border-title min-w-full pb-1">
              <Title size={6} bottomGap="same">
                {data.title}
              </Title>
            </div>
            <div className="pt-3 flex items-center justify-between">
              <div className="flex flex-1">
                {!opened && data.songsCount > 0 && (
                  <div className="flex ml-2">
                    {data.songs.map((song, idx) => (
                      <div
                        key={idx}
                        className="-ml-2 w-5 h-5 rounded-full bg-gray-500 overflow-hidden"
                      >
                        <SmartImage
                          alt={song.name}
                          src={song.thumbnail}
                          className="w-full h-full"
                        />
                      </div>
                    ))}
                    {restSongsCount > 0 && (
                      <div className="flex items-center justify-center ml-2">
                        <Text size="small" className="text-center">
                          +{restSongsCount} Songs
                        </Text>
                      </div>
                    )}
                  </div>
                )}
                {opened && (
                  <div className="flex items-center justify-center">
                    <Text size="small" className="text-center">
                      {data.songsCount} Songs
                    </Text>
                  </div>
                )}
                {!opened && data.songsCount == 0 && (
                  <Text size={"small"} className="text-title">
                    No media files found. You can add media files by clicking
                    the `&quot;Add Song&quot; button.
                  </Text>
                )}
              </div>
              <Button transparent icon="add">
                Add Song
              </Button>
            </div>
            {opened && (
              <div className="songs-list flex-1 overflow-hidden">
                {loading && (
                  <div className="flex items-center justify-center w-full h-full">
                    <Loader />
                  </div>
                )}
                {!loading && songs.length > 0 && (
                  <div className="flex flex-col w-full gap-almost-same">
                    {songs.map((song) => (
                      <SongCard key={song.id} className="mb-2" info={song} />
                    ))}
                  </div>
                )}
                {!loading && songs.length == 0 && (
                  <div className="flex items-center justify-center w-full h-full">
                    <Text size="small" className="text-title">
                      No media files found. You can add media files by clicking
                      the `&quot;Add Song&quot; button.
                    </Text>
                  </div>
                )}
              </div>
            )}
          </div>
        </Beam>
      </Brick>
    </div>
  )
}
export default MediaCategoryCard
