// ui
import { formatClassnames } from "@/ui/Skeleton/utils"
import Stack from "@/ui/Layout/Stack"
// Styles and types
import { ScreenContentProps } from "./types"

function ScreenContent({ children, className }: ScreenContentProps) {
  const calculatedClassNames = formatClassnames(
    "screen-content h-full",
    className
  )
  return <Stack className={calculatedClassNames}>{children}</Stack>
}
export default ScreenContent
