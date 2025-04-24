import { useDatabase } from "@/components/Helpers/Hooks"
import { useStore } from "@/store"
import { SongInfo } from "@cross/types/database/media"
import { useRouter } from "next/navigation"

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
  const playSong = useStore((state) => state.playSong)
  const database = useDatabase()
  const router = useRouter()
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
