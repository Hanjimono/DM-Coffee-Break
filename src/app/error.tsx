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
      <Title align="center" bottomGap="same">
        An critical error occurred.
      </Title>
      <Text className="text-center">
        You can try to reload the page, or return to the home page.
      </Text>
      <Text className="text-center" size="small">
        If the problem persists, please contact the support team.
      </Text>
      <Beam contentJustify="center">
        <Button onClick={reset}>Reload</Button>
        <Button link="/">Home</Button>
      </Beam>
    </Room>
  )
}

export default Error
