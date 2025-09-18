"use client"
// system
import { useEffect } from "react"
import Logger from "electron-log/renderer"
// store
import { useStore } from "@/store"
// ui
import Button from "@/ui/Actions/Button"
import Beam from "@/ui/Layout/Beam"
import Room from "@/ui/Layout/Room"
import Text from "@/ui/Presentation/Text"
import Title from "@/ui/Presentation/Title"
import Inline from "@/ui/Layout/Inline"
import Stack from "@/ui/Layout/Stack"
const Error = ({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) => {
  const criticalSnack = useStore((store) => store.criticalSnack)
  useEffect(() => {
    criticalSnack(error.message)
    Logger.error(error)
  }, [criticalSnack, error.message, reset, error])
  return (
    <Room>
      <Stack gap="same-level-close">
        <Title align="center">An critical error occurred.</Title>
        <Stack gap="close">
          <Text className="text-center">
            You can try to reload the page, or return to the home page.
          </Text>
          <Text className="text-center" size="small">
            If the problem persists, please contact the support team.
          </Text>
        </Stack>
        <Inline className="w-full justify-center">
          <Button transparent onClick={reset}>
            Reload
          </Button>
          <Button link="/">Home</Button>
        </Inline>
      </Stack>
    </Room>
  )
}

export default Error
