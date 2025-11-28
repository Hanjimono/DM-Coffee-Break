// system
import { ipcMain } from "electron"
import Logger from "electron-log/main"
// types
import { IpcFailure, IpcSuccess, MainHandler } from "@cross/types/handlers/main"

/** Helper function to handle IPC main events with type safety */
export function handleIpcMain<THandler extends (...args: any) => any>(
  channel: string,
  handler: MainHandler<THandler>,
  opts?: {
    onError?: (err: any) => IpcFailure
  }
) {
  ipcMain.handle(channel, async (event, ...args) => {
    try {
      const value = await handler(event, ...(args as Parameters<THandler>))
      return { ok: true, data: value } satisfies IpcSuccess<any>
    } catch (err) {
      Logger.error(`Error in IPC handler for channel "${channel}":`, err)
      const failure =
        opts?.onError?.(err) ??
        ({
          ok: false,
          error: err instanceof Error ? err.message : String(err)
        } satisfies IpcFailure)

      return failure
    }
  })
}
