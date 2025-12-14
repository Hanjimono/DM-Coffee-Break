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

/** Type representing a handler in the renderer process */
export type RendererHandler<T extends (...args: any) => any> = (
  ...args: Parameters<T>
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

/** Type for react-query operation type in SDK */
export type OperationType = "query" | "mutation"

/** Interface representing a single specification entry */
export interface SpecificationEntry {
  /** The type of operation (query or mutation) */
  type: OperationType
  /** The key for query associated with the operation */
  key: string
}

/** Specification type for mapping SDK structure to operation types */
export type SpecificationFor<T> = {
  [K in keyof T]: T[K] extends (...args: any) => any
    ? SpecificationEntry
    : SpecificationFor<T[K]>
}

/** Utility type to extract function type from RendererHandler */
type ExtractRendererFn<T> = T extends RendererHandler<infer F> ? F : never

/** Utility type to extract data type from Promise or IpcResponse */
type ExtractData<T> =
  T extends Promise<infer R> ? R : T extends IpcResponse<infer D> ? D : T

/** Type representing a method in the SDK. Maps to query or mutation */
type SdkMethod<
  TFn extends RendererHandler<any>,
  TKind extends SpecificationEntry
> = TKind["type"] extends "query"
  ? (
      ...args: Parameters<ExtractRendererFn<TFn>>
    ) => UseQueryResult<ExtractData<ReturnType<ExtractRendererFn<TFn>>>>
  : (
      ...args: Parameters<ExtractRendererFn<TFn>>
    ) => UseMutationResult<ExtractData<ReturnType<ExtractRendererFn<TFn>>>>

/** Type representing the SDK generated from handlers and specification */
export type SdkFromSpec<THandlers, TSpec> = {
  [K in keyof THandlers]: THandlers[K] extends RendererHandler<any>
    ? SdkMethod<THandlers[K], SpecificationEntry>
    : THandlers[K] extends object
      ? SdkFromSpec<THandlers[K], TSpec>
      : never
}

/** Type alias for the cIpc SDK API */
export type cIpcSDKApi = SdkFromSpec<cIpcHandler, SpecificationFor<cIpcHandler>>
