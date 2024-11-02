import { ipcMain } from "electron"
import { sequelize } from "./connect"

ipcMain.handle("database-authenticate", async () => {
  try {
    await sequelize.authenticate()
    return true
  } catch (error) {
    return false
  }
})
