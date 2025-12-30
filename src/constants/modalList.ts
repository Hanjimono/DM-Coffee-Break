import AlertModal from "@/modals/Helpers/Alert"
import ConfirmModal from "@/modals/Helpers/Confirm"
import CategoryEditModal from "@/modals/Media/CategoryEdit"
import NewSongMethodModal from "@/modals/Media/NewSongMethod"

/** List of all modals */
export const MODAL_LIST = {
  alert: AlertModal,
  confirm: ConfirmModal,
  categoryEdit: CategoryEditModal,
  newSongMethod: NewSongMethodModal
}

/** All available modals names */
export type ModalName = keyof typeof MODAL_LIST
