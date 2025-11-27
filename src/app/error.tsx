"use client"
// system
import { useEffect } from "react"
import Logger from "electron-log/renderer"
// components
import ErrorScreen from "@/components/Containers/ErrorScreen"
// store
import { useStore } from "@/store"

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
  return <ErrorScreen reset={reset} />
}

export default Error
