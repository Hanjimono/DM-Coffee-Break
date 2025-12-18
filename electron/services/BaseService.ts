import Logger from "electron-log"
import logger from "electron-log/main"

/**
 * Dedicated logger for service IPC errors
 */
let serviceErrorLogger: Logger.MainLogger | null = null

/**
 * BaseService class providing common functionality for services.
 * Includes a static method decorator for logging errors in async methods.
 */
export class BaseService {
  /**
   * Get or create a dedicated logger for service errors.
   * This logger is only used to log errors happening inside service methods and should always log to file
   * @returns
   */
  protected static getServiceErrorLogger() {
    if (!serviceErrorLogger) {
      serviceErrorLogger = logger.create({ logId: "service-error" })
      serviceErrorLogger.transports.ipc.level = false
      serviceErrorLogger.transports.file.level = logger.transports.file.level
      serviceErrorLogger.transports.file.resolvePathFn =
        logger.transports.file.resolvePathFn
    }
    return serviceErrorLogger
  }

  /**
   * Decorator to wrap an async method and log any errors that occur during its execution.
   * If an error is caught, it logs the error using `Logger.error` and returns the provided fallback value.
   *
   * @param fallback - Optional value to return if the decorated method throws an error.
   * @returns A method decorator that wraps the original method with error logging and fallback behavior.
   *
   * @example
   * ```typescript
   * class MyService extends BaseService {
   *   @BaseService.logErrors('default')
   *   async fetchData() {
   *     // ...method implementation
   *   }
   * }
   * ```
   */
  protected static logErrors(fallback?: any) {
    return function (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor
    ) {
      const original = descriptor.value
      descriptor.value = async function (...args: any[]) {
        try {
          return await original.apply(this, args)
        } catch (err) {
          BaseService.getServiceErrorLogger().error(`[${propertyKey}]`, err)
          return fallback
        }
      }
      return descriptor
    }
  }

  /**
   * Decorator to wrap an async method and log any errors that occur during its execution.
   * If an error is caught, it logs the error using `Logger.error` and throws a new Error with the provided message.
   *
   * @param message - The custom error message to throw if the decorated method throws an error.
   * @returns A method decorator that wraps the original method with error logging and custom error throwing behavior.
   *
   * @example
   * ```typescript
   * class MyService extends BaseService {
   *   @BaseService.logErrorsWithCustomMessage('Failed to fetch data')
   *   async fetchData() {
   *     // ...method implementation
   *   }
   * }
   * ```
   */
  protected static logErrorsWithCustomMessage(message: string) {
    return function (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor
    ) {
      const original = descriptor.value
      descriptor.value = async function (...args: any[]) {
        try {
          return await original.apply(this, args)
        } catch (err) {
          BaseService.getServiceErrorLogger().error(`[${propertyKey}]`, err)
          throw new Error(message)
        }
      }
      return descriptor
    }
  }
}
