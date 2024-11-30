import { ipcMain } from "electron"
import { sequelize } from "../../database/connect"
import { MediaCategory } from "@cross/types/media/category"
import { Song } from "../../database/models/song"
import { MediaCategory as MediaCategoryModel } from "../../database/models/mediaCategory"
import { SongInfo } from "@cross/types/database/media"

/**
 * Function to get all media categories
 */
ipcMain.handle("media-get-categories", async () => {
  let categories = []
  let categoriesFromDb = await MediaCategoryModel.findAll()
  for (const category of categoriesFromDb) {
    categories.push({
      id: category.id,
      title: category.title,
      hex: category.hex
    })
  }
  return categories
})

/**
 * Function to save or create a media category
 */
ipcMain.handle(
  "media-save-category",
  async (event, categoryInfo: MediaCategory) => {
    try {
      if (categoryInfo.id) {
        let category = await MediaCategoryModel.findOne({
          where: { id: categoryInfo.id }
        })
        if (category) {
          await category.update(categoryInfo)
          return true
        }
        return false
      }
      await MediaCategoryModel.create({ ...categoryInfo })
      return true
    } catch (error) {
      return false
    }
  }
)

/**
 * Function to delete a media category
 */
ipcMain.handle("media-delete-category", async (event, id) => {
  try {
    let category = await MediaCategoryModel.findOne({
      where: { id }
    })
    if (category) {
      await category.destroy()
      //TODO: remove category from all media items inside this category
      return true
    }
    return false
  } catch (error) {
    return false
  }
})

/**
 * Function to create or edit a song
 */
ipcMain.handle("media-edit-song", async (event, song: SongInfo) => {
  try {
    if (song.id) {
      const tags = song.tags
      delete song.tags
      let songFromDb = await Song.findOne({
        where: { id: song.id }
      })
      if (songFromDb) {
        await songFromDb.update(song)
        if (tags) {
          await songFromDb.setTags(tags)
        }
        return true
      }
      return false
    }
    await Song.create({ ...song })
    return true
  } catch (error) {
    return false
  }
})

/**
 * Function to delete a song
 */
ipcMain.handle("media-delete-song", async (event, id) => {
  try {
    let song = await Song.findOne({
      where: { id }
    })
    if (song) {
      await song.destroy()
      return true
    }
    return false
  } catch (error) {
    return false
  }
})

/**
 * Function to get all songs for a category
 */
ipcMain.handle("media-get-songs", async (event, categoryId) => {
  let songs = []
  let songsFromDb = await Song.findAll({
    where: { categoryId }
  })
  for (const song of songsFromDb) {
    songs.push(await song.getInfo())
  }
  return songs
})

/**
 * Function to get unassigned songs
 */
ipcMain.handle("media-get-unassigned-songs", async () => {
  let songs = []
  let songsFromDb = await Song.findAll({
    where: { categoryId: null }
  })
  for (const song of songsFromDb) {
    songs.push(await song.getInfo())
  }
  return songs
})
