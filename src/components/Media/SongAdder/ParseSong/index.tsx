// System
import { useContext, useState } from "react"
// Store
import { useStore } from "@/store"
// Components
import EditSongInfo from "@/components/Media/SongAdder/EditSong/EditSongInfo"
import { SongParserContext } from "@/components/Containers/SongParserProvider"
import SelectFile from "@/components/Media/SelectFile"
// Ui
import Input from "@/ui/Form/Input"
import Beam from "@/ui/Layout/Beam"
import Brick from "@/ui/Layout/Brick"
import Note from "@/ui/Presentation/Note"
import Title from "@/ui/Presentation/Title"
import Pillar from "@/ui/Layout/Pillar"
// Styles and types
import { AvailableMediaSources, ParsedSongInfo } from "@cross/types/media/song"
import { ParseSongProps, SelectSongProps } from "./types"
import { MEDIA_SOURCES, MEDIA_TYPES } from "@cross/constants/media"

export default function ParseSong({ type }: ParseSongProps) {
  const errorSnack = useStore((state) => state.errorSnack)
  const successSnack = useStore((state) => state.successSnack)
  const [link, setLink] = useState("")
  const [parsingInProcess, setParsingInProcess] = useState(false)
  const [parsedInfo, setParsedInfo] = useState<ParsedSongInfo | null>(null)
  const songParser = useContext(SongParserContext)
  const parseSong = async (url: string, source?: AvailableMediaSources) => {
    if (!url) {
      return
    }
    setParsingInProcess(true)
    try {
      const info = await songParser.parseSongInfo({ url, source })
      setParsedInfo(info)
      successSnack("Song parsed successfully")
    } catch (error: any) {
      setParsingInProcess(false)
      if (!error?.message) {
        errorSnack("Error parsing song")
        return
      }
      errorSnack(error.message)
    }
    setParsingInProcess(false)
  }
  const handleCancelClick = () => {
    setParsedInfo(null)
    setLink("")
  }
  return (
    <Beam withoutGap>
      <Title>Add new song</Title>
      {!parsedInfo && type == MEDIA_TYPES.PARSED && (
        <Note className="w-full" bottomGap="same-level" type="info">
          Copy link to song from popular service, such as youtube, soundcloud or
          spotify and paste it to the input below to automatically parse song
          info.
        </Note>
      )}
      <Brick className="px-12 py-8" whole bottomGap="other-level-large">
        <Beam className="pt-4" bottomGap="same-level">
          <Pillar sm={12}>
            {type == MEDIA_TYPES.PARSED && (
              <SelectWebSong
                url={link}
                onUrlChange={setLink}
                parseSong={parseSong}
                loading={parsingInProcess}
                disabled={parsingInProcess || !!parsedInfo}
              />
            )}
            {type == MEDIA_TYPES.UPLOAD && (
              <SelectLocalSong
                url={link}
                onUrlChange={setLink}
                parseSong={parseSong}
                loading={parsingInProcess}
                disabled={parsingInProcess || !!parsedInfo}
              />
            )}
          </Pillar>
        </Beam>
        {parsedInfo && (
          <EditSongInfo
            handleCancelClick={handleCancelClick}
            defaultValues={{
              title: parsedInfo.title || "",
              artist: parsedInfo.artist || "",
              comment: "",
              source: parsedInfo.source,
              url: parsedInfo.url,
              thumbnail: parsedInfo.thumbnail
            }}
          />
        )}
      </Brick>
    </Beam>
  )
}

function SelectLocalSong({
  url,
  onUrlChange,
  parseSong,
  disabled
}: SelectSongProps) {
  const handleFileChange = (file?: string) => {
    onUrlChange(file || "")
    if (!!file) parseSong(file, MEDIA_SOURCES.PC)
  }
  return (
    <SelectFile
      name="song"
      file={url}
      onFileChange={handleFileChange}
      disabled={disabled}
    />
  )
}

function SelectWebSong({
  url,
  onUrlChange,
  parseSong,
  loading,
  disabled
}: SelectSongProps) {
  const handleLinkChange = (name: string, value: string) => {
    onUrlChange(value)
    ;(window as any).clearTimeout((window as any).parseSongTimeout)
    ;(window as any).parseSongTimeout = window.setTimeout(() => {
      parseSong(value)
    }, 600)
  }
  return (
    <Input
      name="link"
      label="Song link"
      value={url}
      onChange={handleLinkChange}
      loading={loading}
      disabled={disabled}
    />
  )
}
