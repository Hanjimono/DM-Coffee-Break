import { ipcMain } from "electron"
import { sequelize } from "./connect"
import { DatabaseVersion } from "@cross/database/types/settings/version"
import { Settings } from "./models/settings"
import { SETTING_DATABASE_VERSION_KEY } from "@cross/database/constants/mainSettings"
import { SETTINGS_CATEGORIES } from "@cross/database/constants/settingsCategories"

ipcMain.handle("database-authenticate", async () => {
  try {
    await sequelize.authenticate()
    return true
  } catch (error) {
    return false
  }
})

ipcMain.handle(
  "database-checkVersion",
  async (event, lastVersion: DatabaseVersion) => {
    try {
      const currentVersion = await Settings.findOne({
        where: { key: SETTING_DATABASE_VERSION_KEY }
      })
      if (!currentVersion) {
        return false
      }
      return currentVersion.value === lastVersion
    } catch (error) {
      return false
    }
  }
)

ipcMain.handle("database-sync", async (event, lastVersion: DatabaseVersion) => {
  try {
    // TODO: move to migrations
    await sequelize.sync({ force: true })
    let currentVersion = await Settings.findOne({
      where: { key: SETTING_DATABASE_VERSION_KEY }
    })
    if (!currentVersion) {
      currentVersion = await Settings.create({
        key: SETTING_DATABASE_VERSION_KEY,
        value: lastVersion,
        category: SETTINGS_CATEGORIES.GENERAL
      })
    } else {
      currentVersion.value = lastVersion
      await currentVersion.save()
    }
    return lastVersion
  } catch (error) {
    return "0.0.0"
  }
})

ipcMain.handle("database-getVersion", async () => {
  try {
    const currentVersion = await Settings.findOne({
      where: { key: SETTING_DATABASE_VERSION_KEY }
    })
    return currentVersion ? currentVersion.value : "0.0.0"
  } catch (error) {
    return "0.0.0"
  }
})
