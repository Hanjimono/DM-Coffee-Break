import {
  cIpcHandler,
  IpcResponse,
  RendererHandler
} from "@cross/types/handlers/main"
import {
  QueryKey,
  UseMutationResult,
  UseQueryResult
} from "@tanstack/react-query"

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

/** Typical context object passed to IPC handlers */
export type CIpcContext = {
  path: string[]
  kind: "query" | "mutation"
  key: QueryKey
  args: unknown[]
}

/** Interface representing a log event in cIpc */
export interface CIpcLogEvent extends CIpcContext {
  duration: number
  result?: unknown
  error?: unknown
}

/** Type representing the next function in middleware chain */
export type CIpcNext<T = unknown> = () => Promise<T>

/** Type representing a middleware function for cIpc */
export type CIpcMiddleware = <T>(
  ctx: CIpcContext,
  next: CIpcNext<T>
) => Promise<T>
