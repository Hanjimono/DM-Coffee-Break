import { SdkFromSpec, SpecificationFor } from "@cross/types/handlers/main"
import { useMutation, useQuery } from "@tanstack/react-query"

/**
 * Create a cIpc SDK from handlers and specification. It maps handlers to react-query queries and mutations.
 *
 * @param handlers - The main cIPC handler instance or part of the nested handlers.
 * @param spec - The specification mapping handlers to operation types.
 * @returns
 */
export function createCIpcSdk<THandlers extends object>(
  handlers: THandlers,
  spec: SpecificationFor<THandlers>
): SdkFromSpec<THandlers, SpecificationFor<THandlers>> {
  const result: any = {}

  for (const key in handlers) {
    const handler = handlers[key as keyof THandlers]
    const kind = spec[key as keyof typeof spec]

    if (typeof handler === "object" && handler !== null) {
      result[key] = createCIpcSdk(
        handler,
        kind as SpecificationFor<typeof handler>
      )
      continue
    }

    if (typeof handler !== "function") {
      throw new Error("Handler is not a function")
    }
    if (kind === "query") {
      result[key] = (...args: any[]) =>
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useQuery({
          queryKey: [key, ...args],
          queryFn: async () => {
            const r = await handler(...args)
            if (!r.ok) throw new Error(r.error)
            return r.data
          }
        })
    }

    if (kind === "mutation") {
      result[key] = (...args: any[]) =>
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useMutation({
          mutationFn: async () => {
            const r = await handler(...args)
            if (!r.ok) throw new Error(r.error)
            return r.data
          }
        })
    }
  }

  return result
}
