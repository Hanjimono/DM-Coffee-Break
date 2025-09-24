// db
import { Settings } from "../database/models/settings"
// constants
import { SETTING_DATABASE_VERSION_KEY } from "@cross/constants/mainSettings"
import { SETTINGS_CATEGORIES } from "@cross/constants/settingsCategories"
// types
import { AvailableSettingsCategories } from "@cross/types/database/settings"

/**
 * Repository class for managing application settings in the database.
 */
export class SettingsRepository {
  async getSettingByKey(key: string) {
    return await Settings.findOne({
      where: { key }
    })
  }

  async getCurrentDatabaseVersion() {
    return await this.getSettingByKey(SETTING_DATABASE_VERSION_KEY)
  }

  async saveNewDatabaseVersion(version: string) {
    let currentVersion = await this.getCurrentDatabaseVersion()
    if (!currentVersion) {
      currentVersion = Settings.build({
        key: SETTING_DATABASE_VERSION_KEY,
        value: "0.0.0",
        category: SETTINGS_CATEGORIES.GENERAL
      })
    }
    currentVersion.value = version
    await currentVersion.save()
  }

  async getBaseUserSettings() {
    return await Settings.findAll({
      where: {
        category: [SETTINGS_CATEGORIES.GENERAL, SETTINGS_CATEGORIES.MEDIA]
      }
    })
  }

  async saveSetting(
    key: string,
    value: string,
    category: AvailableSettingsCategories = SETTINGS_CATEGORIES.GENERAL
  ): Promise<boolean> {
    const currentSetting = await Settings.findOne({
      where: { key, category }
    })
    if (currentSetting) {
      currentSetting.value = value
      await currentSetting.save()
      return true
    } else {
      const newSetting = Settings.build({ key, value, category })
      await newSetting.save()
      return true
    }
  }
}
