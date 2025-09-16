import { sequelize } from "../../database/connect"
import { DatabaseVersion } from "@cross/types/database/settings/version"
import { Settings } from "../../database/models/settings"
import { SETTING_DATABASE_VERSION_KEY } from "@cross/constants/mainSettings"
import { SETTINGS_CATEGORIES } from "@cross/constants/settingsCategories"
import { DEFAULT_USER_SETTINGS } from "@cross/constants/settings"
import {
  MEDIA_PLAYER_SETTINGS_API_KEYS,
  MEDIA_PLAYER_SETTINGS_BOT_KEYS,
  MEDIA_PLAYER_SETTINGS_CLIPBOARD_KEYS,
  MEDIA_PLAYER_SETTINGS_TYPE_KEY,
  SONG_CARD_SETTINGS_KEYS
} from "@cross/constants/settingsMedia"
import { AVAILABLE_MEDIA_PLAYER_TYPES } from "@cross/types/database/settings/media"
import { AvailableSettingsCategories } from "@cross/types/database/settings"
import { Umzug, SequelizeStorage } from "umzug"
import path from "path"
import { is } from "@electron-toolkit/utils"
import { Sequelize } from "sequelize"
import { handleIpcMain } from "./main"
import { DatabaseHandler } from "@cross/types/handlers/database"
import { DATABASE_IPC_CHANNELS } from "@cross/constants/ipc"
import { SettingsService } from "../../services/SettingsService"
import { container } from "../../container"

/**
 * Function to check if the database is connected
 */
handleIpcMain<DatabaseHandler["authenticate"]>(
  DATABASE_IPC_CHANNELS.AUTHENTICATE,
  async () => {
    try {
      await sequelize.authenticate()
      return true
    } catch (error) {
      return false
    }
  }
)

/**
 * Function to check if a database version stored in the settings is the same as
 * the last version defined in the application code
 */
handleIpcMain<DatabaseHandler["checkVersion"]>(
  DATABASE_IPC_CHANNELS.CHECK_VERSION,
  async (event, lastVersion) => {
    return container.settingsService.checkDatabaseVersion(lastVersion)
  }
)

/**
 * Function to sync the database, applying all the migrations
 */
handleIpcMain<DatabaseHandler["sync"]>(
  DATABASE_IPC_CHANNELS.SYNC,
  async (event, lastVersion) => {
    try {
      const umzug = new Umzug({
        migrations: {
          glob: is.dev
            ? "resources/migrations/*.js"
            : path.resolve(process.resourcesPath).replaceAll("\\", "/") +
              "/migrations/*.js",
          resolve: ({ name, path, context }) => {
            if (!path) {
              throw new Error("Migration path is undefined")
            }
            const migration = require(path)
            return {
              name,
              up: async () => migration.up(context, Sequelize),
              down: async () => migration.down(context, Sequelize)
            }
          }
        },
        context: sequelize.getQueryInterface(),
        storage: new SequelizeStorage({ sequelize }),
        logger: console
      })
      await umzug.up()
      await container.settingsService.saveNewDatabaseVersion(lastVersion)
      return lastVersion
    } catch (error) {
      console.log("🚀 ----------------------------------🚀")
      console.log("🚀 ~ ipcMain.handle ~ error:", error)
      console.log("🚀 ----------------------------------🚀")
      return "0.0.0"
    }
  }
)

/**
 * Function to get the current database version stored in the settings
 */
handleIpcMain<DatabaseHandler["getVersion"]>(
  DATABASE_IPC_CHANNELS.GET_VERSION,
  async () => {
    try {
      const currentVersion = await Settings.findOne({
        where: { key: SETTING_DATABASE_VERSION_KEY }
      })
      return currentVersion
        ? (currentVersion.value as DatabaseVersion)
        : "0.0.0"
    } catch (error) {
      return "0.0.0"
    }
  }
)

export async function getUserSettingsFromDb() {
  let settings = { ...DEFAULT_USER_SETTINGS }
  async function getSingleSetting(key: string) {
    return await Settings.findOne({
      where: { key }
    })
  }
  async function getAllSettingsForKeysObjectList<
    KeyObjectType extends Record<string, string>
  >(keysObjectList: KeyObjectType, category: AvailableSettingsCategories) {
    let resultSettings: Record<KeyObjectType[keyof KeyObjectType], string> =
      {} as Record<KeyObjectType[keyof KeyObjectType], string>
    for (const key of Object.values(keysObjectList) as Array<
      KeyObjectType[keyof KeyObjectType]
    >) {
      const setting = await Settings.findOne({
        where: { key, category: category }
      })
      if (setting) {
        resultSettings[key] = setting.value
      }
    }
    return resultSettings
  }
  try {
    const currentVersion = await getSingleSetting(SETTING_DATABASE_VERSION_KEY)
    if (currentVersion) {
      settings.main.version = currentVersion.value as DatabaseVersion
    }
    const songCardSettings = await getAllSettingsForKeysObjectList(
      SONG_CARD_SETTINGS_KEYS,
      SETTINGS_CATEGORIES.MEDIA
    )
    settings.media.songCard = {
      ...settings.media.songCard,
      ...songCardSettings
    }
    const mediaPlayerType = await getSingleSetting(
      MEDIA_PLAYER_SETTINGS_TYPE_KEY
    )
    if (mediaPlayerType) {
      settings.media.player.type = parseInt(
        mediaPlayerType.value
      ) as AVAILABLE_MEDIA_PLAYER_TYPES
    }
    const clipboardSettings = await getAllSettingsForKeysObjectList(
      MEDIA_PLAYER_SETTINGS_CLIPBOARD_KEYS,
      SETTINGS_CATEGORIES.MEDIA
    )
    settings.media.player.clipboard = {
      ...settings.media.player.clipboard,
      ...clipboardSettings
    }
    const apiSettings = await getAllSettingsForKeysObjectList(
      MEDIA_PLAYER_SETTINGS_API_KEYS,
      SETTINGS_CATEGORIES.MEDIA
    )
    settings.media.player.api = { ...settings.media.player.api, ...apiSettings }
    const botSettings = await getAllSettingsForKeysObjectList(
      MEDIA_PLAYER_SETTINGS_BOT_KEYS,
      SETTINGS_CATEGORIES.MEDIA
    )
    settings.media.player.bot = { ...settings.media.player.bot, ...botSettings }
    return settings
  } catch (error) {
    return settings
  }
}

/**
 * Function to get the user settings from the database
 */
handleIpcMain<DatabaseHandler["settings"]["get"]>(
  "database-settings-get",
  async () => {
    return await getUserSettingsFromDb()
  }
)

/**
 * Function to set a user setting in the database
 */
handleIpcMain<DatabaseHandler["settings"]["set"]>(
  "database-settings-set",
  async (event, key: string, value: string, category) => {
    try {
      const setting = await Settings.findOne({
        where: { key }
      })
      if (setting) {
        setting.value = value
        setting.category = category || setting.category
        await setting.save()
      } else {
        await Settings.create({
          key,
          value,
          category: category || SETTINGS_CATEGORIES.GENERAL
        })
      }
      return true
    } catch (error) {
      return false
    }
  }
)
