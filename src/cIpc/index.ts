// system
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient
} from "@tanstack/react-query"
// cIpc
import { executeWithMiddleware } from "./middleware"
// types
import {
  CIpcContext,
  CIpcMiddleware,
  SdkFromSpec,
  SpecificationEntry,
  SpecificationFor
} from "./types"
import { UserConfig } from "@cross/constants/config"
import { IpcResponse } from "@cross/types/handlers/main"

/**
 * Create a cIpc SDK from handlers and specification. It maps handlers to react-query queries and mutations.
 *
 * @param handlers - The main cIPC handler instance or part of the nested handlers.
 * @param spec - The specification mapping handlers to operation types.
 * @param middlewares - Optional array of middlewares to apply to each handler.
 * @param path - The current path in the handler structure (used for nested handlers).
 * @returns
 */
export function createCIpcSdk<
  THandlers extends object,
  TSpec extends SpecificationFor<THandlers>
>(
  handlers: THandlers,
  spec: TSpec,
  queryClient: QueryClient,
  middlewares: CIpcMiddleware[] = [],
  path: string[] = [],
  userConfig: UserConfig = {}
): SdkFromSpec<THandlers, TSpec> {
  const result: any = {}

  for (const key in handlers) {
    const handler = handlers[key as keyof THandlers]
    const specificationEntry = spec[key as keyof typeof spec]
    const nextPath = [...path, key]

    if (typeof handler === "object" && handler !== null) {
      result[key] = createCIpcSdk(
        handler,
        specificationEntry as SpecificationFor<typeof handler>,
        queryClient,
        middlewares,
        nextPath,
        userConfig
      )
      continue
    }

    if (typeof handler !== "function") {
      throw new Error("Handler is not a function")
    }
    if ("type" in specificationEntry === false) {
      throw new Error("Specification entry missing type")
    }

    result[key] = mapSpecEntryToHandler(
      specificationEntry as SpecificationEntry,
      handler,
      key,
      middlewares,
      nextPath,
      userConfig,
      queryClient
    )
  }

  return result
}

/**
 * Maps a specification entry to a react-query handler (query or mutation).
 * @param entry - The specification entry defining the operation type.
 * @param handler- The actual handler function to be wrapped.-
 * @param middlewares - The list of middlewares to apply.
 * @param path - The path of the handler in the cIpc structure.
 * @returns A function that uses react-query to perform the operation with middleware applied.
 */
function mapSpecEntryToHandler(
  entry: SpecificationEntry,
  handler: Function,
  key: string,
  middlewares: CIpcMiddleware[],
  path: string[],
  config: UserConfig = {},
  queryClient: QueryClient
) {
  const kind = entry.type
  const specKey = entry.key
    ? Array.isArray(entry.key)
      ? entry.key
      : [entry.key]
    : [key]
  if (kind === "query") {
    return (...args: any[]) => {
      const { args: actualArgs, options } = splitArgsAndOptions<any>(args)
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return useQuery({
        queryKey: [...specKey, ...actualArgs],
        queryFn: createQueryFn(
          {
            path,
            kind: "query",
            key: [...specKey, ...actualArgs],
            args: actualArgs,
            options,
            config
          },
          middlewares,
          async (ctx) => {
            const r = (await invokeWithTracing(
              handler,
              actualArgs,
              ctx
            )) as IpcResponse<any>
            if (!r.ok) throw new Error(r.error)
            return r.data
          }
        )
      })
    }
  }
  if (kind === "mutation") {
    return (options?: any) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const mutationHook = useMutation({
        mutationKey: [specKey],
        mutationFn: createMutationFn(
          {
            path,
            kind: "mutation",
            args: [],
            key: [...specKey],
            options,
            config
          },
          middlewares,
          async (ctx, variables: unknown) => {
            const r = (await invokeWithTracing(
              handler,
              [variables],
              ctx
            )) as IpcResponse<any>

            if (!r.ok) throw new Error(r.error)
            return r.data
          }
        ),
        onSuccess: (...args) => {
          if (entry.invalidateQueries) {
            entry.invalidateQueries.forEach((key) => {
              queryClient.invalidateQueries({
                queryKey: key
              })
            })
          }
        }
      })
      return {
        ...mutationHook,
        saveMutateAsync: async (variables: unknown) => {
          try {
            const data = await mutationHook.mutateAsync(variables)
            return data
          } catch (error) {
            // Swallow error to prevent unhandled promise rejection in UI
            return undefined
          }
        }
      }
    }
  }
}

/**
 * Splits raw arguments into actual arguments and options if present.
 * @param rawArgs - The array of raw arguments passed to the handler.
 * @returns An object containing the separated arguments and options.
 */
function splitArgsAndOptions<TOptions>(rawArgs: unknown[]): {
  args: unknown[]
  options?: TOptions
} {
  const last = rawArgs[rawArgs.length - 1]

  if (typeof last === "object" && last !== null && "__options" in last) {
    return {
      args: rawArgs.slice(0, -1),
      options: (last as any).__options
    }
  }

  return { args: rawArgs }
}

/**
 * A factory function to create a query function that executes with middleware.
 * @param ctx - The cIpc context for the operation.
 * @param middlewares - The list of middlewares to apply.
 * @param handler - The actual handler function to be executed.
 * @returns A function that executes the handler with middleware applied.
 */
function createQueryFn(
  ctx: CIpcContext,
  middlewares: CIpcMiddleware[],
  handler: (ctx: CIpcContext) => Promise<unknown>
) {
  return () => executeWithMiddleware(ctx, middlewares, handler)
}

/**
 * A factory function to create a mutation function that executes with middleware.
 * @param ctx - The cIpc context for the operation.
 * @param middlewares - The list of middlewares to apply.
 * @param handler - The actual handler function to be executed.
 * @returns A function that executes the handler with middleware applied.
 */
function createMutationFn(
  baseCtx: CIpcContext,
  middlewares: CIpcMiddleware[],
  handler: (ctx: CIpcContext, variables: unknown) => Promise<unknown>
) {
  return (variables: unknown) =>
    executeWithMiddleware(
      {
        ...baseCtx,
        args: [variables]
      },
      middlewares,
      (ctx) => handler(ctx, variables)
    )
}

/**
 * Invokes a handler function with tracing information in the context.
 * @param handler - The handler function to invoke.
 * @param args - The arguments to pass to the handler.
 * @param ctx- The cIpc context containing tracing information.
 * @returns The result of the handler invocation.
 */
async function invokeWithTracing(
  handler: Function,
  args: unknown[],
  ctx: CIpcContext
) {
  return handler(...args, {
    __cIpcMeta: {
      requestId: ctx.requestId
    }
  })
}
