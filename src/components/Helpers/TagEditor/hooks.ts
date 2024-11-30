import { useStore } from "@/store"
import { useCallback, useState } from "react"

/**
 * Custom hook to manage a list of local tags.
 *
 * @param {number[]} [initialTagList] - Optional initial list of tag IDs.
 * @returns {[number[], (tagId: number) => void, (tagId: number) => void]} - An array containing:
 *   - The current list of tag IDs.
 *   - A function to select a tag by its ID.
 *   - A function to deselect a tag by its ID.
 */
export const useLocalTags = (
  initialTagList?: number[]
): [number[], (tagId: number) => void, (tagId: number) => void] => {
  const [tagList, setTagList] = useState(initialTagList || [])
  const handleSelectTag = useCallback(
    (tagId: number) => {
      if (!tagList.includes(tagId)) {
        setTagList([...tagList, tagId])
      }
    },
    [tagList]
  )
  const handleDeselectTag = useCallback(
    (tagId: number) => {
      setTagList(tagList.filter((tag) => tag !== tagId))
    },
    [tagList]
  )

  return [tagList, handleSelectTag, handleDeselectTag]
}

/**
 * Custom hook to manage a list of tags stored in a database.
 *
 * @param handleTagsChange - A function that handles the change in the tag list.
 *                           It takes an array of tag IDs and returns a Promise that resolves to a boolean indicating success or failure.
 * @param initialTagList - An optional initial list of tag IDs.
 *
 * @returns A tuple containing:
 *   - `tagList`: The current list of tag IDs.
 *   - `handleSelectTag`: A function to add a tag to the list.
 *   - `handleDeselectTag`: A function to remove a tag from the list.
 */
export const useDatabaseTags = (
  handleTagsChange: (tagList: number[]) => Promise<boolean>,
  initialTagList?: number[]
) => {
  const [tagList, setTagList] = useState(initialTagList || [])
  const errorSnack = useStore((state) => state.errorSnack)
  const handleSelectTag = useCallback(
    async (tagId: number) => {
      const initialTagList = [...tagList]
      if (!tagList.includes(tagId)) {
        setTagList([...tagList, tagId])
      }
      if (tagId !== -1) {
        // -1 is a special tag ID that indicate a temporary tag
        // it will not be saved to the database and will be removed
        // when an actual tag is created
        try {
          const result = await handleTagsChange([...tagList, tagId])
          if (!result) {
            throw new Error("Failed to add tag")
          }
        } catch (error) {
          setTagList(initialTagList)
          errorSnack("Failed to add tag")
        }
      }
    },
    [tagList, handleTagsChange, errorSnack]
  )

  const handleDeselectTag = useCallback(
    async (tagId: number) => {
      const initialTagList = [...tagList]
      setTagList(tagList.filter((tag) => tag !== tagId))
      if (tagId !== -1) {
        try {
          // -1 is a special tag ID that indicate a temporary tag
          // it was not saved to the database, so it does not need to be removed
          const result = await handleTagsChange(
            tagList.filter((tag) => tag !== tagId)
          )
          if (!result) {
            throw new Error("Failed to remove tag")
          }
        } catch (error) {
          setTagList(initialTagList)
          errorSnack("Failed to remove tag")
        }
      }
    },
    [tagList, handleTagsChange, errorSnack]
  )

  return [tagList, handleSelectTag, handleDeselectTag]
}
