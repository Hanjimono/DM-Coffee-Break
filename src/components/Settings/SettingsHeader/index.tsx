// ui
import { formatClassnames } from "@/ui/Skeleton/utils"
import Stack from "@/ui/Layout/Stack"
import Title from "@/ui/Presentation/Title"
import Divider from "@/ui/Presentation/Divider"
import Text from "@/ui/Presentation/Text"
// Styles and types
import { SettingHeaderProps } from "./types"

function SettingHeader({ className, title, description }: SettingHeaderProps) {
  const calculatedClassNames = formatClassnames("settings-header", className)
  return (
    <Stack className={calculatedClassNames} gap="close">
      <Title>{title}</Title>
      <Divider />
      {description && <Text>{description}</Text>}
    </Stack>
  )
}
export default SettingHeader
