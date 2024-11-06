// Ui
import ActionPanel from "@/ui/Actions/ActionPanel"
// Styles and types
import { IconType } from "@/ui/Presentation/Icon/types"
import styles from "./styles.module.scss"

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

export default function SideMenu() {
  return (
    <ActionPanel
      className={styles["side-navigation"]}
      items={MenuItems}
      endItems={EndItems}
      orientation="vertical"
    />
  )
}
