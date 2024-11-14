import { ipcMain } from "electron"
import { sequelize } from "../../database/connect"
import { MediaCategory } from "@cross/types/media/category"
import { MediaCategory as MediaCategoryModel } from "../../database/models/mediaCategory"

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
