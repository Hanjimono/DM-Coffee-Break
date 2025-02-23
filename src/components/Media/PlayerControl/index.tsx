"use client"
import { useStore } from "@/store"
import Button from "@/ui/Actions/Button"
import SmartImage from "@/ui/Presentation/SmartImage"
import Text from "@/ui/Presentation/Text"
import { MUSIC_PLAYER_STATUS } from "@cross/constants/musicPlayer"

export default function PlayerControl() {
  const status = useStore((state) => state.musicPlayerStatus)
  const currentSong = useStore((state) => state.currentSong)
  const resume = useStore((state) => state.resumeSong)
  const pause = useStore((state) => state.pauseSong)
  const stop = useStore((state) => state.stopSong)
  if (status === MUSIC_PLAYER_STATUS.EMPTY || !currentSong) return null
  return (
    <div className="fixed h-0 bottom-0 inset-x-0 flex items-center justify-center">
      <div className="absolute bottom-full bg-block-500 shadow-lg p-4 rounded-md w-72 overflow-hidden">
        <div className="flex items-center">
          <div className="bg-block-200 w-12 h-12 rounded-md mr-2">
            {currentSong && (
              <SmartImage
                className="max-w-full"
                src={currentSong.thumbnail}
                alt={currentSong.title}
              />
            )}
          </div>
          <div className="flex-1 flex flex-col overflow-hidden">
            {currentSong && (
              <Text type="fit-line">
                {currentSong.comment || currentSong.title}
              </Text>
            )}
            <div className="flex mt-2">
              <Button className="mr-2" icon="play_arrow" onClick={resume} />
              <Button className="mr-2" icon="pause" onClick={pause} />
              <Button icon="stop" onClick={stop} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
