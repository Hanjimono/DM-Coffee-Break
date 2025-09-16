import { is } from "@electron-toolkit/utils"
import { app, BrowserWindow, ipcMain } from "electron"
import { getPort } from "get-port-please"
import { startServer } from "next/dist/server/lib/start-server"
import { discordMusicBot } from "./discordMusicBotObject"
import log from "electron-log/main"
import path, { join } from "path"
import fs from "fs"

let mainWindow: BrowserWindow
let splash: BrowserWindow

const readConfigLogFile = () => {
  const configPath = path.resolve(
    is.dev ? "./" : process.resourcesPath,
    "config.json"
  )
  try {
    const raw = fs.readFileSync(configPath, "utf-8")
    const config = JSON.parse(raw)
    return config
  } catch (error) {
    log.error("Error reading config file:", error)
    return {}
  }
}

const createWindow = () => {
  log.initialize()

  log.transports.file.resolvePathFn = (variables) =>
    path.resolve(is.dev ? "./" : process.resourcesPath, "main.log")

  const config = readConfigLogFile()

  log.transports.console.level = config.logLevel || "warn"
  log.transports.file.level = config.logLevel || "warn"
  if (is.dev) {
    log.transports.console.level = "debug"
    log.transports.file.level = "debug"
  }

  log.debug("Starting application")
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    minWidth: 900,
    minHeight: 670,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, "preload.js"),
      nodeIntegration: true
    }
  })

  splash = new BrowserWindow({
    width: 500,
    height: 300,
    transparent: true,
    frame: false,
    alwaysOnTop: true
  })

  splash.loadFile(
    path.resolve(is.dev ? "./resources" : process.resourcesPath, "splash.html")
  )
  splash.center()

  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow.maximize()
    mainWindow.show()
    splash.close()
    mainWindow.focus()
  })

  mainWindow.on("app-command", (e, cmd) => {
    if (cmd === "browser-backward" || cmd === "browser-forward") {
      e.preventDefault()
    }
  })

  const loadURL = async () => {
    if (is.dev) {
      mainWindow.loadURL("http://localhost:3000")
    } else {
      try {
        const port = await startNextJSServer()
        log.debug("Next.js server started on port:", port)
        mainWindow.loadURL(`http://localhost:${port}`)
      } catch (error) {
        log.debug("Error starting Next.js server:", error)
      }
    }
  }

  loadURL()
  return mainWindow
}

const startNextJSServer = async () => {
  try {
    const nextJSPort = await getPort({ portRange: [30_011, 50_000] })
    const webDir = join(app.getAppPath(), "app")

    await startServer({
      dir: webDir,
      isDev: false,
      hostname: "localhost",
      port: nextJSPort,
      customServer: true,
      allowRetry: false,
      keepAliveTimeout: 5000,
      minimalMode: true
    })

    return nextJSPort
  } catch (error) {
    log.error("Error starting Next.js server:", error)
    throw error
  }
}

app.whenReady().then(() => {
  createWindow()

  ipcMain.on("ping", () => console.log("pong"))
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on("window-all-closed", () => {
  if (discordMusicBot) {
    discordMusicBot.stopSong()
  }
  log.debug("Closing application")
  if (process.platform !== "darwin") app.quit()
})

ipcMain.on("ready", () => {
  splash.close()
  mainWindow.maximize()
  mainWindow.show()
})

// Load all main handlers
import "./handlers/main/databaseMainHandler"
import "./handlers/main/songParserMainHandler"
import "./handlers/main/songCardSettingsMainHandler"
import "./handlers/main/mediaMainHandler"
import "./handlers/main/dictionaryMainHandler"
import "./handlers/main/tagMainHandler"
import "./handlers/main/musicPlayerMainHandler"
import "./handlers/main/filesMainHandler"
