// system
import { prisma } from "@db/prisma"
// logging
import Logger from "electron-log/main"
// helpers
import { handleIpcMain } from "./main"
// containers
import { container } from "../../container"
// constants
import { DATABASE_IPC_CHANNELS } from "@cross/constants/ipc"
// types
import { DatabaseHandler } from "@cross/types/handlers/database"
import { SettingsHandler } from "@cross/types/handlers/settings"

/**
 * Function to check if the database is connected
 */
handleIpcMain<DatabaseHandler["authenticate"]>(
  DATABASE_IPC_CHANNELS.AUTHENTICATE,
  async () => {
    try {
      await prisma.$queryRaw`SELECT 1+1 AS result`
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
      // TODO: migrate from Umzug to handle migrations manually with Prisma Migrate
      // const umzug = new Umzug({
      //   migrations: {
      //     glob: is.dev
      //       ? "resources/migrations/*.js"
      //       : path.resolve(process.resourcesPath).replaceAll("\\", "/") +
      //         "/migrations/*.js",
      //     resolve: ({ name, path, context }) => {
      //       if (!path) {
      //         throw new Error("Migration path is undefined")
      //       }
      //       const migration = require(path)
      //       return {
      //         name,
      //         up: async () => migration.up(context, Sequelize),
      //         down: async () => migration.down(context, Sequelize)
      //       }
      //     }
      //   },
      //   context: sequelize.getQueryInterface(),
      //   storage: new SequelizeStorage({ sequelize }),
      //   logger: Logger
      // })
      // await umzug.up()
      if (await container.settingsService.saveNewDatabaseVersion(lastVersion)) {
        return lastVersion
      }
      return "0.0.0"
    } catch (error) {
      Logger.error("Database sync error:", error)
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
    return await container.settingsService.getCurrentDatabaseVersion()
  }
)

/**
 * Function to get the user settings from the database
 */
handleIpcMain<SettingsHandler["get"]>(
  DATABASE_IPC_CHANNELS.SETTINGS_GET,
  async (...args) => {
    return await container.settingsService.getUserSettings()
  }
)

/**
 * Function to set a user setting in the database
 */
handleIpcMain<SettingsHandler["set"]>(
  "database-settings-set",
  async (event, key: string, value: string, category) => {
    return await container.settingsService.setUserSettings(key, value, category)
  }
)
