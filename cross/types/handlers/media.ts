import { MediaCategory } from "@cross/types/media/category"

/**
 * Interface representing a handler for media-related operations.
 */
export interface MediaHandler {
  /**
   * Saves a media category. Can create a new category or update an existing one.
   * @param data - The media category data to save.
   * @returns A promise that resolves to a boolean indicating whether the save operation was successful.
   */
  saveCategory: (data: MediaCategory) => Promise<boolean>

  /**
   * Deletes a media category by its ID.
   * @param id - The ID of the media category to delete.
   * @returns A promise that resolves to a boolean indicating whether the delete operation was successful.
   */
  deleteCategory: (id: number) => Promise<boolean>

  /**
   * Retrieves all media categories.
   * @returns A promise that resolves to an array of media categories.
   */
  getCategories: () => Promise<MediaCategory[]>
}
