import { ipcMain } from "electron"
import { sequelize } from "../../database/connect"
import { DatabaseVersion } from "@cross/types/database/settings/version"
import { Settings } from "../../database/models/settings"
import { SETTING_DATABASE_VERSION_KEY } from "@cross/constants/mainSettings"
import { SETTINGS_CATEGORIES } from "@cross/constants/settingsCategories"

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
      currentVersion = Settings.build({
        key: SETTING_DATABASE_VERSION_KEY,
        value: "0.0.0",
        category: SETTINGS_CATEGORIES.GENERAL
      })
    }
    currentVersion.value = lastVersion
    await currentVersion.save()
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
