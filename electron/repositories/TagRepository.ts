// db
import { prisma } from "@db/prisma"
import { Tag } from "@db/models"
// types
import { TagInfo } from "@cross/types/database/tags"

/**
 * Repository class for managing tags in the database.
 */
export class TagRepository {
  /**
   * Function to get all tags from the database
   * @returns Promise<Tag[]>
   */
  async getAllTags(): Promise<Tag[]> {
    return await prisma.tag.findMany()
  }

  /**
   * Function to save or create a tag in the database
   * @param tagData TagInfo
   * @returns Promise<Tag>
   */
  async saveTag(tagData: TagInfo): Promise<Tag> {
    if (tagData.id) {
      return await prisma.tag.update({
        where: { id: tagData.id },
        data: {
          title: tagData.title,
          color: tagData.color
        }
      })
    }
    return await prisma.tag.create({
      data: {
        title: tagData.title,
        color: tagData.color
      }
    })
  }

  /**
   * Function to delete a tag from the database
   * @param tagId - number
   * @returns Promise<void>
   */
  deleteTag(tagId: number): Promise<boolean> {
    return prisma.tag
      .delete({
        where: { id: tagId }
      })
      .then(() => true)
      .catch(() => false)
  }
}
