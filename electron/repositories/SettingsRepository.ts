// db
import { prisma } from "@db/prisma"
import { Settings } from "@db/models"
// constants
import { SETTING_DATABASE_VERSION_KEY } from "@cross/constants/mainSettings"
import { SETTINGS_CATEGORIES } from "@cross/constants/settingsCategories"
// types
import { AvailableSettingsCategories } from "@cross/types/database/settings"
/**
 * Repository class for managing application settings in the database.
 */
export class SettingsRepository {
  async getSettingByKey(key: string): Promise<Settings | null> {
    return await prisma.settings.findFirst({
      where: { key }
    })
  }

  async getCurrentDatabaseVersion() {
    return await this.getSettingByKey(SETTING_DATABASE_VERSION_KEY)
  }

  async saveNewDatabaseVersion(version: string) {
    let currentVersion = await this.getCurrentDatabaseVersion()
    if (!currentVersion) {
      return await prisma.settings.create({
        data: {
          key: SETTING_DATABASE_VERSION_KEY,
          value: "0.0.0",
          category: SETTINGS_CATEGORIES.GENERAL
        }
      })
    }
    return await prisma.settings.update({
      where: { id: currentVersion.id },
      data: { value: version }
    })
  }

  async getBaseUserSettings(): Promise<Settings[]> {
    return await prisma.settings.findMany({
      where: {
        category: {
          in: [SETTINGS_CATEGORIES.GENERAL, SETTINGS_CATEGORIES.MEDIA]
        }
      }
    })
  }

  async saveSetting(
    key: string,
    value: string,
    category: AvailableSettingsCategories = SETTINGS_CATEGORIES.GENERAL
  ): Promise<boolean> {
    const currentSetting = await prisma.settings.findFirst({
      where: { key, category }
    })
    if (currentSetting) {
      await prisma.settings.update({
        where: { id: currentSetting.id },
        data: { value }
      })
      return true
    } else {
      await prisma.settings.create({ data: { key, value, category } })
      return true
    }
  }

  async saveMultipleSettings(
    settings: {
      key: string
      value: string | number | boolean
      category?: AvailableSettingsCategories
    }[]
  ): Promise<boolean> {
    await prisma.$transaction(async (tx) => {
      await Promise.all(
        settings.map(async (setting) => {
          const currentSetting = await tx.settings.findFirst({
            where: { key: setting.key }
          })

          if (currentSetting) {
            return tx.settings.update({
              where: { id: currentSetting.id },
              data: { value: String(setting.value) }
            })
          }

          return tx.settings.create({
            data: {
              key: setting.key,
              value: String(setting.value),
              category: setting.category ?? SETTINGS_CATEGORIES.GENERAL
            }
          })
        })
      )
    })
    return true
  }
}
