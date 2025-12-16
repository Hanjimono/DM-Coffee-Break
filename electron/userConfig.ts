import { UserConfig } from "@cross/constants/config"
import { is } from "@electron-toolkit/utils"
import log from "electron-log/main"
import path from "path"
import fs from "fs"

export const readConfigLogFile = () => {
  const configPath = path.resolve(
    is.dev ? "./" : process.resourcesPath,
    "config.json"
  )
  try {
    const raw = fs.readFileSync(configPath, "utf-8")
    const config = JSON.parse(raw)
    return config as UserConfig
  } catch (error) {
    log.error("Error reading config file:", error)
    return {}
  }
}
