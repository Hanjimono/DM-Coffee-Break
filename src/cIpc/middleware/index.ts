import { CIpcContext, CIpcMiddleware } from "../types"

/** Executes a handler function with a series of middleware functions applied in sequence. */
export function executeWithMiddleware<T>(
  ctx: CIpcContext,
  middlewares: CIpcMiddleware[],
  handler: (ctx: CIpcContext) => Promise<T>
): Promise<T> {
  let index = -1

  const dispatch = (i: number): Promise<T> => {
    if (i <= index) {
      return Promise.reject(new Error("next() called multiple times"))
    }
    index = i

    const mw = middlewares[i]
    if (!mw) {
      return handler(ctx)
    }

    return mw(ctx, () => dispatch(i + 1))
  }

  return dispatch(0)
}
