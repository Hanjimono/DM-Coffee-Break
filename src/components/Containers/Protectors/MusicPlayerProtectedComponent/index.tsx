"use client"
// store
import { useStore } from "@/store"
// ui
import Button from "@/ui/Actions/Button"
import Inline from "@/ui/Layout/Inline"
import Stack from "@/ui/Layout/Stack"
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
      <div className="fixed inset-0 bg-block-500 z-top flex items-center justify-center">
        <Stack className="items-center">
          <Title size={1}>Music is currently playing</Title>
          <Text>
            You can not access this functionality while music is playing.
          </Text>
          <Inline>
            <Button transparent onClick={stop}>
              Stop Music
            </Button>
            <Button link="/home">Return to Home</Button>
          </Inline>
        </Stack>
      </div>
    )
  }
  return <>{children}</>
}

export default MusicPlayerProtectedComponent
