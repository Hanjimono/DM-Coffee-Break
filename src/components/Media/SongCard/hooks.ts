// System
import { RefObject, useState } from "react"
import { useRouter } from "next/navigation"
// Components
import { useCIpc } from "@/components/Containers/CIpcProvider/cIpcProviderContainer.client"
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
 * Delete is wired through cIpc and relies on automatic query invalidation
 * to refresh the library list. The play action stays delegated to the
 * music-player store.
 *
 * @param card - The song information object.
 * @returns An array containing three action handlers:
 *   - handlePlay: Function to handle the play action.
 *   - handleEdit: Function to handle the edit action.
 *   - handleDelete: Function to handle the delete action, which includes a confirmation prompt.
 */
export const useCardButtonActions = (
  card: SongInfo
): [() => void, () => void, () => void] => {
  const confirm = useStore((state) => state.confirm)
  const playSong = useStore((state) => state.playSong)
  const router = useRouter()
  const cIpc = useCIpc()
  const deleteSong = cIpc.database.media.deleteSong({
    __options: {
      isShowSuccessSnack: true,
      successMessage: "Song deleted successfully"
    }
  })
  const handlePlay = () => {
    playSong(card)
  }
  const handleEdit = () => {
    router.push(`/media/edit/${card.id}`)
  }
  const handleDelete = () => {
    confirm(`Are you sure you want to delete ${card.title}?`, {
      title: "Delete song",
      onConfirm: async () => {
        if (card.id) {
          await deleteSong.saveMutateAsync({ id: card.id })
        }
      }
    })
  }
  return [handlePlay, handleEdit, handleDelete]
}
