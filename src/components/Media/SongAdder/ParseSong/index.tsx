// System
import { useState } from "react"
// Components
import EditSongInfo from "../EditSongInfo"
// Ui
import Input from "@/ui/Form/Input"
import Beam from "@/ui/Layout/Beam"
import Brick from "@/ui/Layout/Brick"
import Note from "@/ui/Presentation/Note"
import Title from "@/ui/Presentation/Title"
import Pillar from "@/ui/Layout/Pillar"

export default function ParseSong() {
  const [link, setLink] = useState("")
  const [parsingInProcess, setParsingInProcess] = useState(false)
  const [parsedInfo, setParsedInfo] = useState<object | null>(null)
  const parseSong = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setParsingInProcess(false)
    setParsedInfo({})
  }
  const handleLinkChange = (name: string, value: string) => {
    setLink(value)
    ;(window as any).clearTimeout((window as any).parseSongTimeout)
    ;(window as any).parseSongTimeout = window.setTimeout(() => {
      setParsingInProcess(true)
      parseSong()
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
        <Note bottomGap="same-level" type="info">
          Copy link to song from popular service, such as youtube, soundcloud or
          spotify and paste it to the input below to automatically parse song
          info.
        </Note>
      )}
      <Brick whole durability={3} bottomGap="other-level-large">
        <Beam bottomGap="same-level">
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
        {parsedInfo && <EditSongInfo handleCancelClick={handleCancelClick} />}
      </Brick>
    </Beam>
  )
}
