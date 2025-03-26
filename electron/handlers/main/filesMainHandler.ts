import { ipcMain, dialog } from "electron"

/**
 * Run the song parser to parse the song info
 */
ipcMain.handle("files-open-select-dialog", (event) => {
  const result = dialog.showOpenDialogSync({
    properties: ["openFile"]
  })
  if (!result) return undefined
  return result[0]
})
