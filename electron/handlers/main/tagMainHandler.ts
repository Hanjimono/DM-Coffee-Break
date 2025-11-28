// helpers
import { handleIpcMain } from "./main"
// constants
import { TAG_IPC_CHANNELS } from "@cross/constants/ipc"
// containers
import { container } from "../../container"
// types
import { TagHandler } from "@cross/types/handlers/tag"
import { TagInfo } from "@cross/types/database/tags"

/**
 * Function to get all existing tags
 */
handleIpcMain<TagHandler["getAll"]>(TAG_IPC_CHANNELS.GET_ALL, async () => {
  return await container.tagService.getAllTags()
})

/**
 * Function to save or create a tag
 */
handleIpcMain<TagHandler["edit"]>(
  TAG_IPC_CHANNELS.EDIT,
  async (event, tag: TagInfo) => {
    return await container.tagService.saveTag(tag)
  }
)

/**
 * Function to delete a tag
 */
handleIpcMain<TagHandler["delete"]>(
  TAG_IPC_CHANNELS.DELETE,
  async (event, tagId: number) => {
    return await container.tagService.deleteTag(tagId)
  }
)
