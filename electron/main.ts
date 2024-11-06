import { is } from "@electron-toolkit/utils"
import { app, BrowserWindow, ipcMain } from "electron"
import { getPort } from "get-port-please"
import { startServer } from "next/dist/server/lib/start-server"
import path, { join } from "path"

let mainWindow: BrowserWindow
let splash: BrowserWindow

const createWindow = () => {
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
        console.log("Next.js server started on port:", port)
        mainWindow.loadURL(`http://localhost:${port}`)
      } catch (error) {
        console.error("Error starting Next.js server:", error)
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
    console.error("Error starting Next.js server:", error)
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
  if (process.platform !== "darwin") app.quit()
})

ipcMain.on("ready", () => {
  splash.close()
  mainWindow.maximize()
  mainWindow.show()
})

import "./database/mainHandler"
