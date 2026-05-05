"use client"
// System
import { useMemo, useState } from "react"
import { cx } from "class-variance-authority"
import { twMerge } from "tailwind-merge"
// Components
import { useCIpc } from "@/components/Containers/CIpcProvider/cIpcProviderContainer.client"
import ActiveSongCard from "@/components/Media/SongCard/ActiveSong"
// Ui
import Brick from "@/ui/Layout/Brick"
import Text from "@/ui/Presentation/Text"
import Loader from "@/ui/Presentation/Loader"
import Beam from "@/ui/Layout/Beam"
import Button from "@/ui/Actions/Button"
import SmartImage from "@/ui/Presentation/SmartImage"
import Title from "@/ui/Presentation/Title"
// Constants
import { MEDIA_CATEGORY_DEFAULT_SONGS_COUNT } from "@cross/constants/media"
// Styles and types
import { MediaCategoryCardProps } from "./types"

/**
 * Displays a media category card with a list of songs and additional details.
 * It supports toggling between a collapsed and expanded view to show or hide
 * the list of songs. Songs are fetched lazily via cIpc when the card is opened.
 *
 * @param className - Additional class names to style the component.
 * @param data - The data object containing information about the media category.
 */
function MediaCategoryCard({ className, data }: MediaCategoryCardProps) {
  const calculatedClassNames = twMerge(
    cx(
      "media-category rounded-lg overflow-hidden min-w-full cursor-pointer",
      className
    )
  )
  const cIpc = useCIpc()
  const [isOpened, setIsOpened] = useState(false)
  const isUnassignedCategory = !data.id

  // We always declare both hooks to keep hook order stable (React rule),
  // but enable only the relevant one depending on category type and open state.
  const assignedCategorySongs = cIpc.database.media.getSongs(
    { categoryId: data.id ?? 0 },
    { __options: { enabled: isOpened && !isUnassignedCategory } }
  )
  const unassignedCategorySongs = cIpc.database.media.getUnassignedSongs({
    __options: { enabled: isOpened && isUnassignedCategory }
  })

  const songsList =
    (isUnassignedCategory
      ? unassignedCategorySongs.data
      : assignedCategorySongs.data) ?? []
  const isSongsLoading = isUnassignedCategory
    ? unassignedCategorySongs.isLoading
    : assignedCategorySongs.isLoading

  const restSongsCount = useMemo(() => {
    if (data.songsCount < MEDIA_CATEGORY_DEFAULT_SONGS_COUNT) {
      return 0
    }
    return data.songsCount - MEDIA_CATEGORY_DEFAULT_SONGS_COUNT
  }, [data.songsCount])

  const toggleOpened = () => setIsOpened((prev) => !prev)

  return (
    <div onClick={toggleOpened}>
      <Brick className={calculatedClassNames} noPadding durability={6}>
        <Beam>
          <div className="bookmark-part min-w-9 min-h-full relative">
            <div
              style={{ background: data.hex }}
              className="min-w-1.5 max-w-1.5 min-h-full right-0 absolute"
            ></div>
          </div>
          <div className="content-part px-5 py-3 flex-1 flex flex-col overflow-hidden max-h-96">
            <div className="border-b border-title min-w-full pb-1">
              <Title size={6} className="mb-same-level">
                {data.title}
              </Title>
            </div>
            <div className="pt-3 flex items-center justify-between">
              <div className="flex flex-1">
                {!isOpened && data.songsCount > 0 && (
                  <div className="flex ml-2">
                    {data.songs.map((song, idx) => (
                      <div
                        key={idx}
                        className="-ml-2 w-5 h-5 rounded-full bg-gray-500 overflow-hidden"
                      >
                        <SmartImage
                          alt={song.title}
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
                {isOpened && (
                  <div className="flex items-center justify-center">
                    <Text size="small" className="text-center">
                      {data.songsCount} Songs
                    </Text>
                  </div>
                )}
                {!isOpened && data.songsCount == 0 && (
                  <Text size={"small"} className="text-title">
                    No media files found. You can add media files by clicking
                    the `&quot;Add Song&quot; button.
                  </Text>
                )}
              </div>
              <Button className="h-7" transparent icon="add">
                Add Song
              </Button>
            </div>
            {isOpened && (
              <div className="songs-list flex-1 overflow-y-auto">
                {isSongsLoading && (
                  <div className="flex items-center justify-center w-full h-full">
                    <Loader />
                  </div>
                )}
                {!isSongsLoading && songsList.length > 0 && (
                  <div className="flex flex-col py-3 pt-4 w-full gap-almost-same">
                    {songsList.map((song) => (
                      <ActiveSongCard
                        key={song.id}
                        className="mb-2"
                        info={song}
                      />
                    ))}
                  </div>
                )}
                {!isSongsLoading && songsList.length == 0 && (
                  <div className="flex items-center justify-center w-full h-full pt-4">
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
