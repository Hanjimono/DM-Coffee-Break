"use client"
import { useState } from "react"
// Constants
import { MEDIA_TYPES } from "@cross/constants/media"
// Components
import SongParserProvider from "@/components/Containers/SongParserProvider"
import SongTypeChange from "./SongTypeChange"
import ParseSong from "./ParseSong"
// Ui
import Beam from "@/ui/Layout/Beam"
import Button from "@/ui/Actions/Button"

export default function SongAdder() {
  const [songType, setSongType] = useState<
    (typeof MEDIA_TYPES)[keyof typeof MEDIA_TYPES] | undefined
  >(undefined)
  return (
    <SongParserProvider>
      {!songType && <SongTypeChange onChange={setSongType} />}
      {!!songType && (
        <Beam>
          <Button
            icon="arrow_back"
            onClick={() => setSongType(undefined)}
            text
            secondary
            isNoPadding
          >
            Back to change song type
          </Button>
        </Beam>
      )}
      {songType == MEDIA_TYPES.PARSED && <ParseSong />}
    </SongParserProvider>
  )
}
