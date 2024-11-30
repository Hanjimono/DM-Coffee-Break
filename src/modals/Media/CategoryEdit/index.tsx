// System
import clsx from "clsx"
import { useState } from "react"
// Components
import { useDatabase } from "@/components/Helpers/Hooks"
// Utils
import { getRandomDarkColor } from "@cross/utils/randomColor"
// Store
import { useStore } from "@/store"
// Ui
import Modal from "@/ui/Navigation/Modal"
import Room from "@/ui/Layout/Room"
import Beam from "@/ui/Layout/Beam"
import Button from "@/ui/Actions/Button"
import Input from "@/ui/Form/Input"
// Styles and types
import { CategoryEditModalProps } from "./types"
import { cx } from "class-variance-authority"
import { twMerge } from "tailwind-merge"

/**
 * CategoryEditModal component allows users to add or edit a media category.
 *
 * @param {Function} props.onClose - Function to call when the modal is closed.
 * @param {string} [props.className] - Additional class names for styling.
 * @param {Object} [props.data] - The data object containing category details.
 *
 * @returns {JSX.Element} The rendered CategoryEditModal component.
 */
function CategoryEditModal({
  onClose,
  className,
  data
}: CategoryEditModalProps) {
  const calculatedClassNames = twMerge(
    cx("category-edit-modal min-w-80", className)
  )
  const successSnack = useStore((state) => state.successSnack)
  const errorSnack = useStore((state) => state.errorSnack)
  const [categoryTitle, setCategoryTitle] = useState(data?.title || "")
  const database = useDatabase()
  const handleAction = async (isConfirm: boolean) => {
    if (isConfirm) {
      const result = await database.media.saveCategory({
        ...data,
        title: categoryTitle,
        hex: data?.hex || getRandomDarkColor()
      })
      result
        ? successSnack("Category saved")
        : errorSnack("Failed to save category")
    }
    onClose()
  }
  return (
    <Modal
      title={data ? "Edit" + data.title : "Add category"}
      className={calculatedClassNames}
    >
      <Room bottomGap>
        <Input
          label="Category title"
          placeholder="Enter category title"
          name="title"
          onChange={(name, value) => setCategoryTitle(value)}
          value={categoryTitle}
        />
      </Room>
      <Beam>
        <Button
          onClick={() => handleAction(true)}
          success
          disabled={!categoryTitle}
        >
          Save
        </Button>
        <Button onClick={() => handleAction(false)} cancel>
          Cancel
        </Button>
      </Beam>
    </Modal>
  )
}
export default CategoryEditModal
