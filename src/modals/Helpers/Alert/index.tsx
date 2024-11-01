// System
import clsx from "clsx"
// Ui
import Modal from "@/ui/Navigation/Modal"
import Room from "@/ui/Layout/Room"
import Text from "@/ui/Presentation/Text"
// Styles and types
import { AlertModalProps } from "./types"
import styles from "./styles.module.scss"

/**
 * Renders a simple modal with a text.
 *
 * @param {string} props.className - Additional class names to style the modal.
 * @param {string} props.text - The text content to display inside the modal.
 * @param {string} props.title - The title of the modal.
 * @param {function} props.onClose - The callback function to handle the modal close action.
 *
 */
function AlertModal({ className, text, title, onClose }: AlertModalProps) {
  const calculatedClassNames = clsx(styles["alert-modal"], className)
  return (
    <Modal title={title} onClose={onClose} className={calculatedClassNames}>
      <Room>
        <Text>{text}</Text>
      </Room>
    </Modal>
  )
}
export default AlertModal