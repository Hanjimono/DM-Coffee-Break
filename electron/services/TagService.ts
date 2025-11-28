// db
import { Tag } from "@db/models"
// services
import { BaseService } from "./BaseService"
// repositories
import { TagRepository } from "../repositories/TagRepository"
import { TagInfo } from "@cross/types/database/tags"

/**
 * Business logic for managing tags.
 */
export class TagService extends BaseService {
  constructor(private settingsRepository: TagRepository) {
    super()
  }

  formatTagToTagInfo(tag: Tag): TagInfo {
    return {
      id: tag.id,
      title: tag.title,
      color: tag.color || undefined
    }
  }

  @BaseService.logErrors([])
  /**
   * Function to get all tags
   */
  async getAllTags(): Promise<TagInfo[]> {
    const tags = await this.settingsRepository.getAllTags()
    return tags.map(this.formatTagToTagInfo)
  }

  @BaseService.logErrors(false)
  /**
   * Function to save or create a tag
   */
  async saveTag(tagData: TagInfo): Promise<boolean> {
    const tag = await this.settingsRepository.saveTag(tagData)
    return !!tag
  }

  @BaseService.logErrors(false)
  /**
   * Function to delete a tag
   */
  async deleteTag(tagId: number) {
    return await this.settingsRepository.deleteTag(tagId)
  }
}
