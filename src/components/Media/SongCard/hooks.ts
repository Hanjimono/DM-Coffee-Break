// System
import { MutableRefObject, RefObject, useState } from "react"
import { useRouter } from "next/navigation"
// Components
import { useDatabase } from "@/components/Helpers/Hooks"
// Store
import { useStore } from "@/store"
// Types
import { SongInfo } from "@cross/types/database/media"

/**
 * Hook for handling card hover actions. Save position and hovered state.
 *
 * @param ref - The ref of the card element.
 */
export const useCardHoverActions = (
  ref?: RefObject<HTMLDivElement>
): [
  boolean,
  DOMRect | undefined,
  (e: React.MouseEvent<HTMLDivElement>) => void,
  () => void
] => {
  const [hovered, setHovered] = useState(false)
  const [cardPosition, setCardPosition] = useState<DOMRect | undefined>(
    undefined
  )
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setHovered(true)
    if (ref) {
      setCardPosition(e.currentTarget?.getBoundingClientRect())
    }
  }
  const handleMouseLeave = () => {
    setHovered(false)
  }
  return [hovered, cardPosition, handleMouseEnter, handleMouseLeave] as const
}

/**
 * Custom hook that provides action handlers for a song card.
 *
 * @param {SongInfo} card - The song information object.
 * @returns {[() => void, () => void, () => void]} An array containing three action handlers:
 *   - handlePlay: Function to handle the play action.
 *   - handleEdit: Function to handle the edit action.
 *   - handleDelete: Function to handle the delete action, which includes a confirmation prompt.
 */
export const useCardButtonActions = (
  card: SongInfo
): [() => void, () => void, () => void] => {
  const confirm = useStore((state) => state.confirm)
  const errorSnack = useStore((state) => state.errorSnack)
  const successSnack = useStore((state) => state.successSnack)
  const database = useDatabase()
  const router = useRouter()
  const handlePlay = () => {}
  const handleEdit = () => {
    router.push(`/media/edit/${card.id}`)
  }
  const handleDelete = () => {
    confirm(`Are you sure you want to delete ${card.title}?`, {
      title: "Delete song",
      onConfirm: async () => {
        if (card.id) {
          const result = await database.media.deleteSong(card.id)
          if (!result) {
            errorSnack("Failed to delete song")
            return
          }
        }
        successSnack("Song deleted successfully")
        window.location.reload()
      }
    })
  }
  return [handlePlay, handleEdit, handleDelete]
}
