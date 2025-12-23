"use client"
// ui
import { formatClassnames } from "@/ui/Skeleton/utils"
import Stack from "@/ui/Layout/Stack"
import Room from "@/ui/Layout/Room"
// Styles and types
import { ScreenProps } from "./types"

/**
 * A basic wrapper for a screen. It's create a simple flex-box without gap.
 */
function Screen({ children, className }: ScreenProps) {
  const calculatedClassNames = formatClassnames("screen", className)
  return (
    <Room>
      <Stack className={calculatedClassNames} gap="none">
        {children}
      </Stack>
    </Room>
  )
}
export default Screen
