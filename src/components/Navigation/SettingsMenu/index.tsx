// Ui
import Menu from "@/ui/Navigation/Menu"
// Styles and types
import styles from "./styles.module.scss"

const MENU = [
  {
    title: "Global",
    items: [
      {
        title: "Database",
        link: "/settings/global/database"
      }
    ]
  }
]
function SettingsMenu() {
  return <Menu className={styles["settings-menu"]} items={MENU} />
}
export default SettingsMenu
