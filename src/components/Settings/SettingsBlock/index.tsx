"use client"
// ui
import Brick from "@/ui/Layout/Brick"
import { formatClassnames } from "@/ui/Skeleton/utils"
import Stack from "@/ui/Layout/Stack"
import TabPanel from "@/ds/Navigation/TabPanel"
// Styles and types
import { SettingsBlockProps } from "./types"

const MENU_ITEMS = [
  { name: "Global", href: "/settings/global/database" },
  { name: "Song Card", href: "/settings/media/songCard" },
  { name: "Player", href: "/settings/media/player" }
]

/**
 * Basic settings wrapper, including the tab panel for navigation.
 *
 * @param {SettingsBlockProps} props - The props for the SettingsBlock component.
 * @param {React.ReactNode} props.children - The content to be displayed inside the settings block.
 * @param {string} [props.className] - Optional additional class names for styling the block.
 *
 * @returns {JSX.Element} The rendered settings block component.
 */
function SettingsBlock({ children, className }: SettingsBlockProps) {
  const calculatedClassNames = formatClassnames(
    "settings-block p-card pb-20",
    className
  )
  return (
    <Brick className={calculatedClassNames} durability={6}>
      <Stack>
        <TabPanel items={MENU_ITEMS} />
        {children}
      </Stack>
    </Brick>
  )
}
export default SettingsBlock
