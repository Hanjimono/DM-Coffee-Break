// System
import { cx } from "class-variance-authority"
import { twMerge } from "tailwind-merge"
// Ui
import Modal from "@/ui/Navigation/Modal"
import Text from "@/ui/Presentation/Text"
import Button from "@/ui/Actions/Button"
import Inline from "@/ui/Layout/Inline"
import Stack from "@/ui/Layout/Stack"
// Styles and types
import { ConfirmModalProps } from "./types"

/**
 * Renders a confirm modal dialog with customizable text, title, and action buttons.
 * It provides handlers for confirm and cancel actions, and ensures the modal is closed after an action is taken.
 * Modal can be closed only by clicking on the action buttons.
 *
 * @param {string} props.text - The text to display in the modal body.
 * @param {Function} props.onClose - The function to call when the modal is closed.
 * @param {Function} props.onCancel - The function to call when the cancel button is clicked.
 * @param {Function} props.onConfirm - The function to call when the confirm button is clicked.
 * @param {string} props.title - The title of the modal.
 * @param {string} [props.cancelButtonTitle="Cancel"] - The text to display on the cancel button.
 * @param {string} [props.confirmButtonTitle="OK"] - The text to display on the confirm button.
 * @param {string} [props.className] - Additional class names to apply to the modal.
 *
 * @returns {JSX.Element} The rendered ConfirmModal component.
 */
function ConfirmModal({
  text,
  onClose,
  onCancel,
  onConfirm,
  title,
  cancelButtonTitle = "Cancel",
  confirmButtonTitle = "OK",
  className
}: ConfirmModalProps) {
  const calculatedClassNames = twMerge(
    cx("confirm box-border min-w-[300px] max-w-[420px]", className)
  )
  const handleAction = (isConfirm: boolean) => {
    if (isConfirm) {
      onConfirm?.()
    } else {
      onCancel?.()
    }
    onClose()
  }
  return (
    <Modal title={title} className={calculatedClassNames}>
      <Stack>
        <Text>{text}</Text>
        <Inline className="justify-end" gap="close">
          <Button onClick={() => handleAction(false)} primary transparent>
            {cancelButtonTitle}
          </Button>
          <Button onClick={() => handleAction(true)} primary>
            {confirmButtonTitle}
          </Button>
        </Inline>
      </Stack>
    </Modal>
  )
}
export default ConfirmModal
