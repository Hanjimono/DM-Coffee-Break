// system
import { ipcMain } from "electron"
import logger from "electron-log/main"
// types
import {
  CIpcRendererCallMeta,
  IpcFailure,
  IpcSuccess,
  MainHandler
} from "@cross/types/handlers/main"
import Logger from "electron-log"

/**
 * Dedicated logger for IPC errors
 */
let ipcErrorLogger: Logger.MainLogger | null = null

/**
 * Get or create a dedicated logger for IPC errors, so it doesn't depends on the main logger ipc level
 * This logger is only used to log errors happening inside IPC handlers and should always log to file
 * @returns
 */
function getIpcErrorLogger() {
  if (!ipcErrorLogger) {
    // Create a dedicated logger for IPC errors, so it doesn't depends on the main logger ipc level
    // This logger is only used to log errors happening inside IPC handlers and should always log to file
    ipcErrorLogger = logger.create({ logId: "ipc-error" })
    ipcErrorLogger.transports.ipc.level = false
    ipcErrorLogger.transports.file.level = logger.transports.file.level
    ipcErrorLogger.transports.file.resolvePathFn =
      logger.transports.file.resolvePathFn
  }
  return ipcErrorLogger
}

/** Helper function to handle IPC main events with type safety */
export function handleIpcMain<THandler extends (...args: any) => any>(
  channel: string,
  handler: MainHandler<THandler>,
  opts?: {
    onError?: (err: any) => IpcFailure
  }
) {
  ipcMain.handle(channel, async (event, ...args) => {
    // Extract the Meta object from the arguments
    const lastArg = args.length > 0 ? args[args.length - 1] : null
    let meta = {
      __cIpcMeta: { requestId: "unknown" }
    } as CIpcRendererCallMeta
    // Remove the last argument if it's the special Meta object
    if (lastArg && typeof lastArg === "object" && "__cIpcMeta" in lastArg) {
      meta = args.pop() as CIpcRendererCallMeta
    }
    try {
      const value = await handler(event, ...(args as Parameters<THandler>))
      return { ok: true, data: value } satisfies IpcSuccess<any>
    } catch (err) {
      getIpcErrorLogger().error(
        `Error in IPC handler for channel "${channel}" [${meta.__cIpcMeta.requestId}]:`,
        err
      )
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
