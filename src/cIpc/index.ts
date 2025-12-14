import { executeWithMiddleware } from "./middleware"
import {
  CIpcContext,
  CIpcMiddleware,
  SdkFromSpec,
  SpecificationEntry,
  SpecificationFor
} from "./types"
import { useMutation, useQuery } from "@tanstack/react-query"

/**
 * Create a cIpc SDK from handlers and specification. It maps handlers to react-query queries and mutations.
 *
 * @param handlers - The main cIPC handler instance or part of the nested handlers.
 * @param spec - The specification mapping handlers to operation types.
 * @param middlewares - Optional array of middlewares to apply to each handler.
 * @param path - The current path in the handler structure (used for nested handlers).
 * @returns
 */
export function createCIpcSdk<THandlers extends object>(
  handlers: THandlers,
  spec: SpecificationFor<THandlers>,
  middlewares: CIpcMiddleware[] = [],
  path: string[] = []
): SdkFromSpec<THandlers, SpecificationFor<THandlers>> {
  const result: any = {}

  for (const key in handlers) {
    const handler = handlers[key as keyof THandlers]
    const specificationEntry = spec[key as keyof typeof spec]
    const nextPath = [...path, key]

    if (typeof handler === "object" && handler !== null) {
      result[key] = createCIpcSdk(
        handler,
        specificationEntry as SpecificationFor<typeof handler>,
        middlewares,
        nextPath
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
      nextPath
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
  path: string[]
) {
  const kind = entry.type
  const specKey = entry.key ?? key
  if (kind === "query") {
    return (...args: any[]) =>
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useQuery({
        queryKey: [specKey, ...args],
        queryFn: createQueryFn(
          {
            path,
            kind: "query",
            key: [specKey, ...args],
            args
          },
          middlewares,
          async () => {
            const r = await handler(...args)
            if (!r.ok) throw new Error(r.error)
            return r.data
          }
        )
      })
  }
  if (kind === "mutation") {
    return (...args: any[]) =>
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useMutation({
        mutationKey: [specKey, ...args],
        mutationFn: createQueryFn(
          {
            path,
            kind: "mutation",
            key: [specKey, ...args],
            args
          },
          middlewares,
          async () => {
            const r = await handler(...args)
            if (!r.ok) throw new Error(r.error)
            return r.data
          }
        )
      })
  }
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
  handler: () => Promise<unknown>
) {
  return () => executeWithMiddleware(ctx, middlewares, handler)
}
