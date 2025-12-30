// System
import { useState } from "react"
// Utils
import { getRandomDarkColor } from "@cross/utils/randomColor"
import { useCIpc } from "@/components/Containers/CIpcProvider/cIpcProviderContainer.client"
// Ui
import Modal from "@/ui/Navigation/Modal"
import Room from "@/ui/Layout/Room"
import Button from "@/ui/Actions/Button"
import Input from "@/ui/Form/Input"
import Inline from "@/ui/Layout/Inline"
import Stack from "@/ui/Layout/Stack"
import { formatClassnames } from "@/ui/Skeleton/utils"
// Styles and types
import { CategoryEditModalProps } from "./types"

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
  const calculatedClassNames = formatClassnames(
    "category-edit-modal min-w-80 p-card",
    className
  )
  const cIpc = useCIpc()
  const saveCategory = cIpc.database.media.saveCategory({
    __options: {
      successMessage: "Category saved",
      isShowSuccessSnack: true
    }
  })
  const [categoryTitle, setCategoryTitle] = useState(data?.title || "")
  const handleAction = async (isConfirm: boolean) => {
    if (isConfirm) {
      await saveCategory.saveMutateAsync({
        ...data,
        title: categoryTitle,
        hex: data?.hex || getRandomDarkColor()
      })
    }
    onClose()
  }
  return (
    <Modal
      title={data ? "Edit" + data.title : "Add category"}
      className={calculatedClassNames}
      onClose={() => handleAction(false)}
    >
      <Stack gap="distant">
        <Room>
          <Input
            label="Category title"
            placeholder="Enter category title"
            name="title"
            onChange={(name, value) => setCategoryTitle(value)}
            value={categoryTitle}
          />
        </Room>
        <Inline className="justify-end">
          <Button onClick={() => handleAction(false)} transparent>
            Cancel
          </Button>
          <Button
            onClick={() => handleAction(true)}
            disabled={!categoryTitle}
            icon="add"
          >
            Add
          </Button>
        </Inline>
      </Stack>
    </Modal>
  )
}
export default CategoryEditModal
