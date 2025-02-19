"use client"
// Store
import { useStore } from "@/store"
// Ui
import Button from "@/ui/Actions/Button"
import Loader from "@/ui/Presentation/Loader"

export default function PlayerLoader() {
  const isLoading = useStore((state) => state.musicPlayerLoading)
  const stop = useStore((state) => state.stopSong)
  if (!isLoading) return null
  return (
    <div className="bg-primary-transparent fixed inset-0 z-top flex justify-center items-center">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="w-32 h-32">
          <Loader size={"full"} />
        </div>
        <p className="text-lg text-white">
          The music player bot is taking an action. Please, wait...
        </p>
        <Button cancel onClick={stop}>
          Stop the player
        </Button>
      </div>
    </div>
  )
}
