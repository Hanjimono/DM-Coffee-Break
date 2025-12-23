// ui
import { formatClassnames } from "@/ui/Skeleton/utils"
import Inline from "@/ui/Layout/Inline"
// Styles and types
import { ScreenControlPanelProps } from "./types"

/**
 * A control panel for screen layouts, typically used to house buttons or other interactive elements.
 * Add defined gap between children and margin bottom to separate from same level content.
 *
 * @param isCentered - Center the content
 */
function ScreenControlPanel({
  children,
  className,
  isCentered
}: ScreenControlPanelProps) {
  const calculatedClassNames = formatClassnames(
    "screen-control-panel mb-same-level",
    isCentered && "justify-center",
    className
  )
  return (
    <Inline className={calculatedClassNames} gap="distant">
      {children}
    </Inline>
  )
}
export default ScreenControlPanel
