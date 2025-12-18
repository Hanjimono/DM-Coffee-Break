// system
import {
  QueryKey,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult
} from "@tanstack/react-query"
// constants
import { UserConfig } from "@cross/constants/config"
// types
import {
  cIpcHandler,
  IpcResponse,
  RendererHandler
} from "@cross/types/handlers/main"
import { cIpcSpecification } from "./spec"

/** Options for making cIpc calls with additional UI feedback settings */
export type CIpcCallOptions = {
  /** Whether to show a success snackbar on successful operation */
  isShowSuccessSnack?: boolean
  /** Whether to hide error snackbar on failed operation */
  isHideErrorSnack?: boolean
  /** Custom success message to display in snackbar */
  successMessage?: string
}

/** Options for cIpc query operations */
export type CIpcQueryOptions<TData> = Omit<
  UseQueryOptions<TData>,
  "queryKey" | "queryFn"
> &
  CIpcCallOptions

/** Options for cIpc mutation operations */
export type CIpcMutationOptions<TData, TVariables> = Omit<
  UseMutationOptions<TData, unknown, TVariables>,
  "mutationKey" | "mutationFn"
> &
  CIpcCallOptions

/** Argument type that includes optional cIpc operation options */
export interface CIpcOptionsArgument<TData, TVariables> {
  /** Options for query operations */
  __options: CIpcQueryOptions<TData> | CIpcMutationOptions<TData, TVariables>
}

/** Type for react-query operation type in SDK */
export type OperationType = "query" | "mutation"

/** Type for query keys to invalidate after mutations */
type QueryInvalidateType = readonly string[]

/** Interface representing a single specification entry */
export interface SpecificationEntry {
  /** The type of operation (query or mutation) */
  type: OperationType
  /** The key for query associated with the operation */
  key: string[] | string
  /** Optional array of query keys to invalidate after mutation */
  invalidateQueries?: readonly QueryInvalidateType[]
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

/** Utility type to extract mutation variables from RendererHandler */
type MutationVariables<TFn extends RendererHandler<any>> = Parameters<
  ExtractRendererFn<TFn>
>[0]

/** Type representing a method in the SDK. Maps to query or mutation */
type SdkMethod<
  TFn extends RendererHandler<any>,
  TKind extends SpecificationEntry
> = TKind["type"] extends "query"
  ? (
      ...args: [
        ...Parameters<ExtractRendererFn<TFn>>,
        options?: CIpcOptionsArgument<
          ExtractData<ReturnType<ExtractRendererFn<TFn>>>,
          never
        >
      ]
    ) => UseQueryResult<ExtractData<ReturnType<ExtractRendererFn<TFn>>>>
  : (
      options?: CIpcOptionsArgument<
        ExtractData<ReturnType<ExtractRendererFn<TFn>>>,
        never
      >
    ) => UseMutationResult<
      ExtractData<ReturnType<ExtractRendererFn<TFn>>>,
      Error,
      MutationVariables<TFn>
    > & {
      saveMutateAsync: (
        variables: MutationVariables<TFn>,
        options?: Omit<
          CIpcMutationOptions<
            ExtractData<ReturnType<ExtractRendererFn<TFn>>>,
            MutationVariables<TFn>
          >,
          "mutationKey" | "mutationFn"
        >
      ) => Promise<ExtractData<ReturnType<ExtractRendererFn<TFn>>> | undefined>
    }

/** Type representing the SDK generated from handlers and specification */
export type SdkFromSpec<
  THandlers,
  TSpec extends SpecificationFor<THandlers>
> = {
  [K in keyof THandlers]: K extends keyof TSpec
    ? THandlers[K] extends RendererHandler<any>
      ? TSpec[K] extends SpecificationEntry
        ? SdkMethod<THandlers[K], TSpec[K]>
        : never
      : THandlers[K] extends object
        ? TSpec[K] extends SpecificationFor<THandlers[K]>
          ? SdkFromSpec<THandlers[K], TSpec[K]>
          : never
        : never
    : never
}

/** Type alias for the cIpc SDK API */
export type cIpcSDKApi = SdkFromSpec<cIpcHandler, typeof cIpcSpecification>

export type test = cIpcSDKApi["database"]

/** Typical context object passed to IPC handlers */
export type CIpcContext = {
  /** Full path of the handler being invoked */
  path: string[]
  /** Kind of operation being performed */
  kind: "query" | "mutation"
  /** Key associated with the operation (for react-query) */
  key: QueryKey
  /** Arguments passed to the handler */
  args: unknown[]
  /** Additional options for the cIpc call */
  options: CIpcCallOptions
  /** User configuration object */
  config?: UserConfig
  /** Optional unique request ID for tracing */
  requestId?: string
  /** Optional start time for performance measurement */
  startTime?: number
}

/** Interface representing a log event in cIpc */
export interface CIpcLogEvent extends CIpcContext {
  /** Duration of the operation in milliseconds */
  duration: number
  /** Result of the operation, if successful */
  result?: unknown
  /** Error encountered during the operation, if any */
  error?: unknown
}

/** Type representing the next function in middleware chain */
export type CIpcNext<T = unknown> = () => Promise<T>

/** Type representing a middleware function for cIpc */
export type CIpcMiddleware = <T>(
  ctx: CIpcContext,
  next: CIpcNext<T>
) => Promise<T>
