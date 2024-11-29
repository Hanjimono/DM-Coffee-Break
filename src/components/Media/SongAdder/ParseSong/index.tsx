// System
import { useContext, useState } from "react"
// Store
import { useStore } from "@/store"
// Components
import EditSongInfo from "../EditSongInfo"
import { SongParserContext } from "@/components/Containers/SongParserProvider"
// Ui
import Input from "@/ui/Form/Input"
import Beam from "@/ui/Layout/Beam"
import Brick from "@/ui/Layout/Brick"
import Note from "@/ui/Presentation/Note"
import Title from "@/ui/Presentation/Title"
import Pillar from "@/ui/Layout/Pillar"
// Styles and types
import { ParsedSongInfo } from "@cross/types/media/song"
import { cx } from "class-variance-authority"

export default function ParseSong() {
  const errorSnack = useStore((state) => state.errorSnack)
  const successSnack = useStore((state) => state.successSnack)
  const [link, setLink] = useState("")
  const [parsingInProcess, setParsingInProcess] = useState(false)
  const [parsedInfo, setParsedInfo] = useState<ParsedSongInfo | null>(null)
  const songParser = useContext(SongParserContext)
  const parseSong = async (url: string) => {
    if (!url) {
      return
    }
    setParsingInProcess(true)
    try {
      const info = await songParser.parseSongInfo({ url })
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
  const handleLinkChange = (name: string, value: string) => {
    setLink(value)
    ;(window as any).clearTimeout((window as any).parseSongTimeout)
    ;(window as any).parseSongTimeout = window.setTimeout(() => {
      parseSong(value)
    }, 600)
  }
  const handleCancelClick = () => {
    setParsedInfo(null)
    setLink("")
  }
  return (
    <Beam withoutGap>
      <Title>Parse song from Web</Title>
      {!parsedInfo && (
        <Note className="w-full" bottomGap="same-level" type="info">
          Copy link to song from popular service, such as youtube, soundcloud or
          spotify and paste it to the input below to automatically parse song
          info.
        </Note>
      )}
      <Brick className="px-12 py-8" whole bottomGap="other-level-large">
        <Beam className="pt-4" bottomGap="same-level">
          <Pillar sm={12}>
            <Input
              name="link"
              label="Song link"
              value={link}
              onChange={handleLinkChange}
              loading={parsingInProcess}
              disabled={parsingInProcess || !!parsedInfo}
            />
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
