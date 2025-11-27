// db
import { prisma } from "@db/prisma"
import { MediaCategory } from "@db/models"
// types
import { SaveMediaCategoryDTO } from "@cross/types/media/category"

/**
 * Repository class for managing media categories in the database.
 */
export class MediaCategoryRepository {
  /**
   * Retrieves all media categories from the database.
   * @returns A promise that resolves to an array of media categories.
   */
  getAllMediaCategories(): Promise<MediaCategory[]> {
    return prisma.mediaCategory.findMany()
  }

  /**
   * Saves a media category to the database. If the category has an ID, it updates the existing category; otherwise, it creates a new one.
   * @param data - The media category data to save.
   * @returns A promise that resolves to the saved media category.
   */
  saveMediaCategory(data: SaveMediaCategoryDTO): Promise<MediaCategory> {
    if (data.id) {
      return prisma.mediaCategory.update({
        where: { id: data.id },
        data: {
          title: data.title,
          hex: data.hex || null
        }
      })
    } else {
      return prisma.mediaCategory.create({
        data: {
          title: data.title,
          hex: data.hex || null
        }
      })
    }
  }

  /**
   * Deletes a media category by its ID.
   * @param id - The ID of the media category to delete.
   * @returns A promise that resolves to a boolean indicating whether the delete operation was successful.
   */
  deleteMediaCategoryById(id: number): Promise<boolean> {
    return prisma.mediaCategory
      .delete({
        where: { id }
      })
      .then(() => true)
      .catch(() => false)
  }
}
