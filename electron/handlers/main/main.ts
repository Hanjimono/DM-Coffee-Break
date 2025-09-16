import { MainHandler } from "@cross/types/handlers/main"
import { ipcMain } from "electron"

/** Helper function to handle IPC main events with type safety */
export function handleIpcMain<THandler extends (...args: any) => any>(
  channel: string,
  handler: MainHandler<THandler>
) {
  ipcMain.handle(channel, handler)
}
