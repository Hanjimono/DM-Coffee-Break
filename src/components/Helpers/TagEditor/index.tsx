// System
import { useCallback } from "react"
// Ui
import { TagElement } from "@/ui/Actions/TagLine/types"
import TagLine from "@/ui/Actions/TagLine"
// Utils
import { getRandomDarkColor } from "@cross/utils/randomColor"
import { useCIpc } from "@/components/Containers/CIpcProvider/cIpcProviderContainer.client"
// Styles and types
import { TagEditorProps } from "./types"
import { TagInfo } from "@cross/types/database/tags"

/**
 * TagEditor component for managing tags.
 *
 * This component allows users to select, create, and delete tags. It maintains an internal state of the tag list
 * and interacts with a database context to persist changes.
 *
 * @template Tag - The type of the tag element.
 * @param {Object} props - The properties object.
 * @param {number[]} props.selectedTagIds - The IDs of the selected tags.
 * @param {function} props.onSelectTag - Callback function to handle tag selection.
 * @param {function} props.onDeselectTag - Callback function to handle tag deselection.
 * @returns {JSX.Element} The rendered TagEditor component.
 */
function TagEditor<Tag extends TagElement>({
  selectedTagIds,
  onSelectTag,
  onDeselectTag,
  ...rest
}: TagEditorProps<Tag>) {
  const cIpc = useCIpc()
  const tagList = cIpc.database.tag.getAll()
  const createTag = cIpc.database.tag.edit()
  const deleteTag = cIpc.database.tag.delete()

  /**
   *
   * This function creates a new tag with the specified title and color.
   *
   * @param {string} title - The title of the new tag.
   */
  const onCreateTag = useCallback(
    async (title: string) => {
      const color = getRandomDarkColor()
      if (onDeselectTag) {
        onSelectTag(-1)
      }
      if (onDeselectTag) {
        onDeselectTag(-1)
      }
      await createTag.saveMutateAsync({ title, color })
    },
    [createTag, onSelectTag, onDeselectTag]
  )

  /**
   * This function deletes a tag by its ID.
   *
   * @param {number} tagId - The ID of the tag to be deleted.
   */
  const onDeleteTag = useCallback(
    async (tagId: number) => {
      const result = await deleteTag.saveMutateAsync({ id: tagId })
      if (result) {
        if (onDeselectTag) {
          onDeselectTag(tagId)
        }
      }
    },
    [deleteTag, onDeselectTag]
  )
  return (
    <TagLine<TagInfo>
      {...rest}
      selectedTagIds={selectedTagIds}
      onSelectTag={onSelectTag}
      onDeselectTag={onDeselectTag}
      allAvailableTagList={tagList.data || []}
      onCreateTag={onCreateTag}
      onDeleteTag={onDeleteTag}
    />
  )
}
export default TagEditor
