import path from "path"
import { app } from "electron"
import { is } from "@electron-toolkit/utils"

const { Sequelize } = require("sequelize")
const sqlite3 = require("sqlite3")
let base = app.getAppPath()
if (app.isPackaged) {
  base = base.replace("app.asar", "")
}
export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.resolve(process.resourcesPath, "database.sqlite"),
  dialectModule: sqlite3
})
