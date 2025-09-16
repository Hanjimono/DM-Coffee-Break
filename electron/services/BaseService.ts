import Logger from "electron-log/main"

/**
 * BaseService class providing common functionality for services.
 * Includes a static method decorator for logging errors in async methods.
 */
export class BaseService {
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
          Logger.error(`[${propertyKey}]`, err)
          return fallback
        }
      }
      return descriptor
    }
  }
}
