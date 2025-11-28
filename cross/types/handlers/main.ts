import type { IpcMainInvokeEvent } from "electron"

/** IPC channel names */
export type IpcChannel = Record<string, string>

/** Type for successful IPC response */
export type IpcSuccess<T> = { ok: true; data: T }
/** Type for failed IPC response */
export type IpcFailure = { ok: false; error: string; details?: any }
/** Union type for IPC responses */
export type IpcResponse<T> = IpcSuccess<T> | IpcFailure

/** Utility type to unwrap the return type of IPC handlers */
type UnwrapIpcReturn<T> =
  T extends Promise<IpcResponse<infer R>>
    ? Promise<R>
    : T extends IpcResponse<infer R>
      ? R
      : T

/** Type representing a handler in the renderer process */
export type RendererHandler<T extends (...args: any) => any> = (
  ...args: Parameters<T>
) => Promise<IpcResponse<Awaited<ReturnType<T>>>>

/** Type representing a handler in the main process */
export type MainHandler<T extends (...args: any) => any> = (
  event: IpcMainInvokeEvent,
  ...args: Parameters<T>
) => UnwrapIpcReturn<ReturnType<T>>
