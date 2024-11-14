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
  },
  {
    title: "Media",
    items: [
      {
        title: "Song Card",
        link: "/settings/media/songCard"
      }
    ]
  }
]

/**
 * SettingsMenu component renders a menu with categories and pages for application settings.
 *
 * @returns {JSX.Element} The rendered settings menu component.
 */
function SettingsMenu() {
  return <Menu className={styles["settings-menu"]} items={MENU} />
}
export default SettingsMenu
