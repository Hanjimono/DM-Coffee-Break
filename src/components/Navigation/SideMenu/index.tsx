// Ui
import ActionPanel from "@/ui/Actions/ActionPanel"
// Styles and types
import { IconType } from "@/ui/Presentation/Icon/types"

const MenuItems = [
  {
    icon: "/public/images/logo_icon.png",
    link: "/home",
    iconType: "custom" as IconType,
    className: "mb-4 mx-auto",
    iconSize: 40
  },
  {
    icon: "/public/images/media_icon.png",
    link: "/media",
    iconType: "custom" as IconType,
    customIconHover: "/public/images/media_icon_hover.png",
    className: "mx-auto",
    iconSize: 27
  },
  {
    icon: "/public/images/game_icon.png",
    link: "/games",
    iconType: "custom" as IconType,
    customIconHover: "/public/images/game_icon_hover.png",
    className: "mx-auto",
    iconSize: 27
  }
]

const EndItems = [
  {
    icon: "settings",
    link: "/settings/global/database",
    iconType: "md" as IconType,
    success: true,
    className: "mx-auto",
    iconSize: 25
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
      className={"rounded-none z-10 bg-block-600 px-2 py-7 w-16"}
      items={MenuItems}
      endItems={EndItems}
      orientation="vertical"
      isNoPadding
    />
  )
}
