"use client"
// system
import { useState } from "react"
import { useRouter } from "next/navigation"
// utils
import { useCIpc } from "@/components/Containers/CIpcProvider/cIpcProviderContainer.client"
// components
import ParseSongInput from "./ParseSongInput"
import SongFileInput from "./SongFileInput"
import SongInfoEdit from "./SongInfoEdit"
// ui
import { formatClassnames } from "@/ui/Skeleton/utils"
import Room, { HiddenRoom } from "@/ui/Layout/Room"
import Stack from "@/ui/Layout/Stack"
// Styles and types
import { SongEditProps } from "./types"
import { ParsedSongInfo } from "@cross/types/media/song"
import { SongInfo } from "@cross/types/database/media"

/**
 * Renders a component for editing song information.
 * It allows the user to parse a song file or enter a URL and parse the song information.
 * It also allows the user to edit the song information.
 *
 * @param songInfo - Existing song info for edit mode
 * @param isParseMode - Flag indicating if the component is in parse mode
 * @returns
 */
function SongEdit({ songInfo: baseSongInfo, isParseMode }: SongEditProps) {
  const calculatedClassNames = formatClassnames("song-edit")
  const [isParseActive, setIsParseActive] = useState(!!!baseSongInfo)
  const [songInfo, setSongInfo] = useState<SongInfo | null>(
    baseSongInfo || null
  )
  const cIpc = useCIpc()
  const editSong = cIpc.database.media.editSong()
  const router = useRouter()

  const handleSave = async (redactedSongInfo: SongInfo) => {
    const result = await editSong.saveMutateAsync({
      ...redactedSongInfo,
      url: songInfo?.url || ""
    })
    if (result) {
      router.push(`/media`)
    }
  }

  const handleParse = (info: ParsedSongInfo) => {
    setSongInfo({
      title: info.title || "",
      artist: info.artist || "",
      duration: info.duration,
      thumbnail: info.thumbnail,
      url: info.url,
      source: info.source
    })
    setIsParseActive(false)
  }
  return (
    <Room className={calculatedClassNames}>
      <Stack gap="distant">
        <Room>
          {isParseMode && (
            <ParseSongInput
              isParseActive={isParseActive}
              onParse={handleParse}
              defaultUrl={baseSongInfo?.url}
            />
          )}
          {!isParseMode && (
            <SongFileInput
              isParseActive={isParseActive}
              onParse={handleParse}
              defaultUrl={baseSongInfo?.url}
            />
          )}
        </Room>
        <HiddenRoom isShown={!!songInfo && !isParseActive} mode="wait">
          <SongInfoEdit
            songInfo={songInfo}
            onChangeLink={() => {
              setIsParseActive(true)
            }}
            onSave={handleSave}
          />
        </HiddenRoom>
      </Stack>
    </Room>
  )
}
export default SongEdit
