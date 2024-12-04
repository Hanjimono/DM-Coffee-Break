import { Sequelize } from "sequelize"
import path from "path"
import { is } from "@electron-toolkit/utils"

const sqlite3 = require("sqlite3")
export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.resolve(
    is.dev ? "./" : process.resourcesPath,
    "database.sqlite"
  ),
  dialectModule: sqlite3
})
