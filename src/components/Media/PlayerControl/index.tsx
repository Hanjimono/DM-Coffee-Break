"use client"
// store
import { useStore } from "@/store"
// components
import SongView from "@/components/Media/SongCard/SongView"
// constants
import { MUSIC_PLAYER_STATUS } from "@cross/constants/musicPlayer"
// ui
import Button from "@/ui/Actions/Button"

/**
 * A music player control interface.
 * It displays the current song information and provides a stop button to stop the playback.
 *
 * The component returns `null` if:
 * - The music player status is `MUSIC_PLAYER_STATUS.EMPTY`.
 * - There is no `currentSong` available.
 *
 */
export default function PlayerControl() {
  const status = useStore((state) => state.musicPlayerStatus)
  const currentSong = useStore((state) => state.currentSong)
  const stop = useStore((state) => state.stopSong)
  if (status === MUSIC_PLAYER_STATUS.EMPTY || !currentSong) return null
  return (
    <div className="w-full h-16 flex items-center justify-center bg-block-800 px-16">
      <div className="flex-1">
        <SongView
          className="px-0"
          info={currentSong}
          isTransparent
          isOnlyBaseInfo
        />
      </div>
      <Button
        icon="/public/images/player_stop.png"
        iconType="custom"
        iconSize={14}
        text
        onClick={stop}
      />
    </div>
  )
}
