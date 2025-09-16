import { Tag } from "../../database/models/tag"
import { TagToSong } from "../../database/models/tagToSong"
import { TagInfo } from "@cross/types/database/tags"
import { handleIpcMain } from "./main"
import { TagHandler } from "@cross/types/handlers/tag"
import { TAG_IPC_CHANNELS } from "@cross/constants/ipc"

/**
 * Function to get all existing tags
 */
handleIpcMain<TagHandler["getAll"]>(TAG_IPC_CHANNELS.GET_ALL, async () => {
  let tags = []
  let tagsFromDb = await Tag.findAll()
  for (const tag of tagsFromDb) {
    tags.push({
      id: tag.id,
      title: tag.title,
      color: tag.color
    })
  }
  return tags
})

/**
 * Function to save or create a tag
 */
handleIpcMain<TagHandler["edit"]>(
  TAG_IPC_CHANNELS.EDIT,
  async (event, tag: TagInfo) => {
    try {
      if (tag.id) {
        let tagFromDb = await Tag.findOne({
          where: { id: tag.id }
        })
        if (tagFromDb) {
          await tagFromDb.update(tag)
          return true
        }
        return false
      }
      await Tag.create({ ...tag })
      return true
    } catch (error) {
      return false
    }
  }
)

/**
 * Function to delete a tag
 */
handleIpcMain<TagHandler["delete"]>(
  TAG_IPC_CHANNELS.DELETE,
  async (event, tagId: number) => {
    try {
      let tagFromDb = await Tag.findOne({
        where: { id: tagId }
      })
      if (tagFromDb) {
        //TODO remove link from all sources
        TagToSong.destroy({
          where: {
            tagId: tagId
          }
        })
        await tagFromDb.destroy()
        return true
      } else {
        return false
      }
    } catch (error) {
      return false
    }
  }
)
