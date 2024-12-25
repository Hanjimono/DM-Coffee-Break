import { ipcMain } from "electron"
import { sequelize } from "../../database/connect"
import { SONG_CARD_SETTINGS_KEYS } from "@cross/constants/settingsMedia"
import { SETTINGS_CATEGORIES } from "@cross/constants/settingsCategories"
import { Op } from "sequelize"
import { Settings } from "../../database/models/settings"

/**
 * Function to get all setting from the database related to the song card
 */
ipcMain.handle("song-card-settings-get", async () => {
  let settings = {} as Record<string, string>
  let settingsFromDb = (await sequelize.models.Settings.findAll({
    where: {
      category: SETTINGS_CATEGORIES.MEDIA,
      key: {
        [Op.in]: Object.values(SONG_CARD_SETTINGS_KEYS) as Array<string>
      }
    }
  })) as Settings[]
  for (const setting of settingsFromDb) {
    settings[setting.key] = setting.value
  }
  return settings
})

/**
 * Function to update song card settings in the database
 */
ipcMain.handle("song-card-settings-set", async (event, data) => {
  try {
    for (const setting of data) {
      const settingExists = await sequelize.models.Settings.findOne({
        where: { key: setting.key }
      })
      if (settingExists) {
        await sequelize.models.Settings.update(
          { value: setting.value },
          { where: { key: setting.key } }
        )
      } else {
        await sequelize.models.Settings.create({
          key: setting.key,
          value: setting.value,
          category: SETTINGS_CATEGORIES.MEDIA
        })
      }
    }
    return true
  } catch (error) {
    return false
  }
})

/**
 * Function to update one song card setting in the database
 */
ipcMain.handle("song-card-settings-set-one", async (event, key, value) => {
  try {
    const settingExists = await sequelize.models.Settings.findOne({
      where: { key }
    })
    if (settingExists) {
      await sequelize.models.Settings.update({ value }, { where: { key } })
    } else {
      await sequelize.models.Settings.create({
        key,
        value,
        category: SETTINGS_CATEGORIES.MEDIA
      })
    }
    return true
  } catch (error) {
    return false
  }
})
