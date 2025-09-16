import { SETTING_DATABASE_VERSION_KEY } from "@cross/constants/mainSettings"
import { Settings } from "../database/models/settings"
import { SETTINGS_CATEGORIES } from "@cross/constants/settingsCategories"

export class SettingsRepository {
  async getCurrentDatabaseVersion() {
    return await Settings.findOne({
      where: { key: SETTING_DATABASE_VERSION_KEY }
    })
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
}
