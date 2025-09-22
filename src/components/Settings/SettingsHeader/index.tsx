// ui
import { formatClassnames } from "@/ui/Skeleton/utils"
import Stack from "@/ui/Layout/Stack"
import Title from "@/ui/Presentation/Title"
import Divider from "@/ui/Presentation/Divider"
import Text from "@/ui/Presentation/Text"
// Styles and types
import { SettingsHeaderProps } from "./types"

/**
 * Renders a header section for the settings page, including a title, a divider, and an optional description.
 *
 * @param {string} [props.className] - Additional CSS class names to apply to the header container.
 * @param {React.ReactNode} props.title - The title to display in the header.
 * @param {React.ReactNode} [props.description] - Optional description text to display below the title.
 */
function SettingsHeader({
  className,
  title,
  description
}: SettingsHeaderProps) {
  const calculatedClassNames = formatClassnames("settings-header", className)
  return (
    <Stack className={calculatedClassNames} gap="close">
      <Title>{title}</Title>
      <Divider className="border-b-2" />
      {description && <Text>{description}</Text>}
    </Stack>
  )
}
export default SettingsHeader
