// Ui
import ActionPanel from "@/ui/Actions/ActionPanel"
// Styles and types
import { IconType } from "@/ui/Presentation/Icon/types"

const MenuItems = [
  {
    icon: "/public/images/logo_icon.png",
    link: "/home",
    iconType: "custom" as IconType
  },
  {
    icon: "/public/images/media_icon.png",
    link: "/media",
    iconType: "custom" as IconType
  },
  {
    icon: "/public/images/game_icon.png",
    link: "/games",
    iconType: "custom" as IconType
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
      className={"rounded-none z-10 bg-block-600"}
      items={MenuItems}
      endItems={EndItems}
      orientation="vertical"
    />
  )
}
