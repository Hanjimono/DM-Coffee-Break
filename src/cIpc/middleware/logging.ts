// system
import Logger from "electron-log/renderer"
// types
import { CIpcLogEvent, CIpcMiddleware } from "../types"

/**
 * Logs cIpc events to the console.
 * @param event The cIpc event to log.
 */
function logToConsole(event: CIpcLogEvent) {
  const label = `%ccIpc ${event.kind.toUpperCase()}`
  const color = event.kind === "query" ? "#3b82f6" : "#22c55e"

  console.groupCollapsed(
    label,
    `color:${color};font-weight:bold`,
    event.path.join(".") + (event.requestId ? ` [${event.requestId}]` : ""),
    event.error ? "❌" : "✅"
  )

  console.log("args:", event.args)
  console.log("key:", event.key)
  console.log("duration:", `${event.duration.toFixed(1)}ms`)

  if (event.error) {
    console.error("error:", event.error)
  } else {
    console.log("result:", event.result)
  }

  console.groupEnd()
}

/**
 * Logs cIpc events to a file using electron-log.
 * @param event The cIpc event to log.
 */
function logToFile(event: CIpcLogEvent) {
  if (event.error) {
    Logger.error(
      `cIpc ${event.kind.toUpperCase()} ${event.path.join(".")} [${event.requestId ?? "unknown"}] failed`,
      {
        args: event.args,
        duration: `${event.duration.toFixed(1)}ms`,
        error: event.error
      }
    )
  } else {
    Logger.info(
      `cIpc ${event.kind.toUpperCase()} ${event.path.join(".")} [${event.requestId ?? "unknown"}] succeeded`,
      {
        args: event.args,
        duration: `${event.duration.toFixed(1)}ms`,
        result: event.result
      }
    )
  }
}

/**
 * Middleware for logging cIpc events.
 *
 * @param ctx - The cIpc context.
 * @param next - The next middleware function in the chain.
 * @returns The result of the next middleware function.
 */
export const loggingMiddleware: CIpcMiddleware = async (ctx, next) => {
  const start = performance.now()
  const isDev = process.env.NODE_ENV === "development"
  const isTrace = ctx.config?.traceApiCalls === true

  try {
    const result = await next()
    const duration = performance.now() - start

    if (isDev) {
      logToConsole({
        ...ctx,
        duration,
        result
      })
    }

    if (isTrace) {
      logToFile({
        ...ctx,
        duration,
        result
      })
    }

    return result
  } catch (error) {
    const duration = performance.now() - start

    if (isDev) {
      logToConsole({
        ...ctx,
        duration,
        error
      })
    }

    if (isTrace) {
      logToFile({
        ...ctx,
        duration,
        error
      })
    }

    throw error
  }
}
