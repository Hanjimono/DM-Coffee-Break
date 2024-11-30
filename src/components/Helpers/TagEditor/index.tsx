// System
import { useCallback, useEffect, useState } from "react"
// Components
import { useDatabase } from "@/components/Helpers/Hooks"
// Ui
import { TagElement } from "@/ui/Actions/TagLine/types"
import TagLine from "@/ui/Actions/TagLine"
// Utils
import { getRandomDarkColor } from "@cross/utils/randomColor"
// Store
import { useStore } from "@/store"
// Styles and types
import { TagEditorProps } from "./types"

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
  const [tagList, setTagList] = useState<Tag[]>([])
  const database = useDatabase()
  const errorSnack = useStore((state) => state.errorSnack)
  useEffect(() => {
    database.tag.getAll().then((tags) => {
      setTagList(tags as Tag[])
    })
  }, [database])

  /**
   * Handles the creation of a new tag.
   *
   * This function first optimistically updates the tag list state by adding a new tag with the specified title.
   * It then attempts to create the tag in the database. If the creation fails, it shows an error message and
   * reverts the tag list state to its previous state.
   *
   * @param {string} title - The title of the new tag.
   */
  const onCreateTag = useCallback(
    async (title: string) => {
      const oldTagsList = [...tagList]
      const color = getRandomDarkColor()
      setTagList([...tagList, { id: -1, title, color } as Tag])
      if (onDeselectTag) {
        onSelectTag(-1)
      }
      try {
        const result = await database.tag.edit({ title, color })
        if (!result) {
          throw new Error("Failed to create tag")
        }
      } catch (error) {
        errorSnack("Failed to create tag")
        setTagList(oldTagsList)
      }
      if (onDeselectTag) {
        onDeselectTag(-1)
      }
      database.tag.getAll().then((tags) => {
        const createdTagId = tags.find((tag) => tag.title === title)?.id
        if (createdTagId) {
          onSelectTag(createdTagId)
        }
        setTagList(tags as Tag[])
      })
    },
    [database, errorSnack, onSelectTag, onDeselectTag, tagList]
  )

  /**
   * Deletes a tag by its ID and updates the tag list state.
   *
   * This function first optimistically updates the tag list state by removing the tag with the specified ID.
   * It then attempts to delete the tag from the database. If the deletion fails, it shows an error message and
   * reverts the tag list state to its previous state.
   *
   * @param {number} tagId - The ID of the tag to be deleted.
   */
  const onDeleteTag = useCallback(
    async (tagId: number) => {
      const oldTagsList = [...tagList]
      setTagList(tagList.filter((tag) => tag.id !== tagId))
      try {
        const result = await database.tag.delete(tagId)
        if (!result) {
          throw new Error("Failed to delete tag")
        }
        database.tag.getAll().then((tags) => {
          setTagList(tags as Tag[])
        })
        if (onDeselectTag) {
          onDeselectTag(tagId)
        }
      } catch (error) {
        errorSnack("Failed to delete tag")
        setTagList(oldTagsList)
      }
    },
    [database, errorSnack, onDeselectTag, tagList]
  )
  return (
    <TagLine
      {...rest}
      selectedTagIds={selectedTagIds}
      onSelectTag={onSelectTag}
      onDeselectTag={onDeselectTag}
      allAvailableTagList={tagList}
      onCreateTag={onCreateTag}
      onDeleteTag={onDeleteTag}
    />
  )
}
export default TagEditor
