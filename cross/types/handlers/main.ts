import type { IpcMainInvokeEvent } from "electron"

/** IPC channel names */
export type IpcChannel = Record<string, string>

/** Type representing a handler in the renderer process */
export type RendererHandler<T extends (...args: any) => any> = T

/** Type representing a handler in the main process */
export type MainHandler<T extends (...args: any) => any> = (
  event: IpcMainInvokeEvent,
  ...args: Parameters<T>
) => ReturnType<T>
