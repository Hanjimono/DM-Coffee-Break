"use client"
// store
import { useStore } from "@/store"
// components
import ScreenControlPanel from "@/components/Layout/ScreenControlPanel"
// ui
import { formatClassnames } from "@/ui/Skeleton/utils"
import Button from "@/ui/Actions/Button"
// Styles and types
import { LibraryControlPanelProps } from "./types"

/**
 * Renders a control panel for the library.
 * It allows the user to add a new song or add a new category.
 *
 * @param className - Additional class names
 * @returns
 */
function LibraryControlPanel({ className }: LibraryControlPanelProps) {
  const calculatedClassNames = formatClassnames(
    "library-control-panel",
    className
  )
  const openModal = useStore((state) => state.openModal)
  return (
    <ScreenControlPanel className={calculatedClassNames} isCentered>
      <Button
        className="text-text"
        icon="add"
        onClick={() => openModal("newSongMethod")}
        isText
      >
        Add Song
      </Button>
      <Button
        className="text-text"
        icon="folder"
        onClick={() => openModal("categoryEdit")}
        isText
      >
        Add category
      </Button>
    </ScreenControlPanel>
  )
}
export default LibraryControlPanel
