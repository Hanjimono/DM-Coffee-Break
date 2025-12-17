import { TagInfo } from "../database/tags"
import { RendererHandler } from "./main"

interface EditTagDTO extends TagInfo {}

interface DeleteTagDTO {
  id: number
}

/**
 * Interface representing a handler for tag operations.
 */
export interface TagHandler {
  /**
   * Retrieves all tags.
   * @returns A promise that resolves to an array of TagInfo objects.
   */
  getAll: RendererHandler<() => Promise<TagInfo[]>>

  /**
   * Edits or creates a tag.
   * @param tag - The tag information to be edited.
   * @returns A promise that resolves to a boolean indicating the success of the operation.
   */
  edit: RendererHandler<(arg: EditTagDTO) => Promise<boolean>>

  /**
   * Deletes a tag.
   * @param tag - An object containing the ID of the tag to be deleted.
   * @returns A promise that resolves to a boolean indicating the success of the operation.
   */
  delete: RendererHandler<(arg: DeleteTagDTO) => Promise<boolean>>
}
