"use client"
import { useState } from "react"
// Constants
import { MEDIA_TYPES } from "@cross/database/constants/media"
// Components
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
    <>
      {!songType && <SongTypeChange onChange={setSongType} />}
      {!!songType && (
        <Beam>
          <Button
            icon="arrow_back"
            onClick={() => setSongType(undefined)}
            text
            secondary
          >
            Back to change song type
          </Button>
        </Beam>
      )}
      {songType == MEDIA_TYPES.PARSED && <ParseSong />}
    </>
  )
}
