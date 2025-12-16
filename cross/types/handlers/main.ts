import { UseMutationResult, UseQueryResult } from "@tanstack/react-query"
import type { IpcMainInvokeEvent } from "electron"
import { DatabaseHandler } from "./database"
import { SongParserHandler } from "./songParser"
import { FilesHandler } from "./files"
import { MusicPlayerHandler } from "./musicPlayer"

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

/** Metadata interface for cIpc renderer calls */
export interface CIpcRendererCallMeta {
  /** An actual meta info */
  __cIpcMeta: {
    /** Request ID for tracing purposes */
    requestId: string
  }
}
/** Type representing a handler in the renderer process */
export type RendererHandler<T extends (...args: any) => any> = (
  ...args: [...Parameters<T>, meta?: CIpcRendererCallMeta]
) => Promise<IpcResponse<Awaited<ReturnType<T>>>>

/** Type representing a handler in the main process */
export type MainHandler<T extends (...args: any) => any> = (
  event: IpcMainInvokeEvent,
  ...args: Parameters<T>
) => UnwrapIpcReturn<ReturnType<T>>

/** Combined main IPC handler interface */
export interface cIpcHandler {
  database: DatabaseHandler
  songParser: SongParserHandler
  filesHandler: FilesHandler
  musicPlayer: MusicPlayerHandler
}
