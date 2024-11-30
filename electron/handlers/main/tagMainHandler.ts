import { ipcMain } from "electron"
import { Tag } from "../../database/models/tag"
import { TagToSong } from "../../database/models/tagToSong"
import { TagInfo } from "@cross/types/database/tags"

/**
 * Function to get all existing tags
 */
ipcMain.handle("tag-get-all", async () => {
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
ipcMain.handle("tag-edit", async (event, tag: TagInfo) => {
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
})

/**
 * Function to delete a tag
 */
ipcMain.handle("tag-delete", async (event, tag: { id: number }) => {
  try {
    let tagFromDb = await Tag.findOne({
      where: { id: tag.id }
    })
    if (tagFromDb) {
      //TODO remove link from all sources
      TagToSong.destroy({
        where: {
          tagId: tag.id
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
})
