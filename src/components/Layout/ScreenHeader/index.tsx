// ui
import { formatClassnames } from "@/ui/Skeleton/utils"
import Title from "@/ui/Presentation/Title"
// Styles and types
import { ScreenHeaderProps } from "./types"

/**
 * Render a screen header with a title with defined size and bottom margin.
 * @param {ScreenHeaderProps} props - Props for ScreenHeader component
 * @returns {JSX.Element} The rendered ScreenHeader component
 */
function ScreenHeader({ className, title }: ScreenHeaderProps) {
  const calculatedClassNames = formatClassnames(
    "screen-header mb-distant",
    className
  )
  return (
    <Title className={calculatedClassNames} size={3}>
      {title}
    </Title>
  )
}
export default ScreenHeader
