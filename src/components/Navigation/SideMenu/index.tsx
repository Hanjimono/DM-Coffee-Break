// Ui
import ActionPanel from "@/ui/Actions/ActionPanel"
// Styles and types
import { IconType } from "@/ui/Presentation/Icon/types"

const MenuItems = [
  {
    icon: "home",
    link: "/home",
    iconType: "md" as IconType
  }
]

const EndItems = [
  {
    icon: "settings",
    link: "/settings/global/database",
    iconType: "md" as IconType
  }
]

/**
 * SideMenu component renders a vertical action panel with navigation items.
 *
 * @component
 * @returns {JSX.Element} The rendered SideMenu component.
 */
export default function SideMenu() {
  return (
    <ActionPanel
      className={"rounded-none"}
      items={MenuItems}
      endItems={EndItems}
      orientation="vertical"
    />
  )
}
