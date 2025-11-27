// db
import { prisma } from "@db/prisma"
import { MediaCategory } from "@db/models"

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
}
