"use client"
// store
import { useStore } from "@/store"
// ui
import Button from "@/ui/Actions/Button"
import Beam from "@/ui/Layout/Beam"
import Text from "@/ui/Presentation/Text"
import Title from "@/ui/Presentation/Title"

/**
 * A component that protects its children from being accessed while music is playing.
 * If a song is currently playing, it displays a message and provides options to stop the music or return to the home page.
 *
 * @param {React.ReactNode} props.children - The child components to be rendered if no music is playing.
 */
const MusicPlayerProtectedComponent = ({
  children
}: {
  children: React.ReactNode
}) => {
  const currentSong = useStore((state) => state.currentSong)
  const stop = useStore((state) => state.stopSong)
  if (currentSong) {
    return (
      <div className="fixed inset-0 bg-primary-transparent z-top flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4 p-4">
          <Title size={1}>Music is currently playing</Title>
          <Text>
            You can not access this functionality while music is playing.
          </Text>
          <Beam contentJustify="center">
            <Button onClick={stop}>Stop Music</Button>
            <Button link="/home">Return to Home</Button>
          </Beam>
        </div>
      </div>
    )
  }
  return <>{children}</>
}

export default MusicPlayerProtectedComponent
