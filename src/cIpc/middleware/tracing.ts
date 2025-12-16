// system
import { nanoid } from "nanoid"
// types
import { CIpcMiddleware } from "../types"

/**
 * Middleware to add tracing information to cIpc calls.
 * @param ctx - The context of the cIpc call.
 * @param next - The next function in the middleware chain.
 * @returns The result of the cIpc operation.
 */
export const tracingMiddleware: CIpcMiddleware = async (ctx, next) => {
  ctx.requestId = nanoid(8)
  ctx.startTime = performance.now()

  return next()
}
