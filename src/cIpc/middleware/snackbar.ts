// system
import { useStore } from "@/store"
// types
import { CIpcMiddleware } from "../types"

/**
 * Middleware to show snackbars for success and error messages.
 * @param ctx - The context of the cIpc call.
 * @param next - The next function in the middleware chain.
 * @returns The result of the cIpc operation.
 */
export const snackbarMiddleware: CIpcMiddleware = async (ctx, next) => {
  try {
    const result = await next()

    if (ctx.options?.isShowSuccessSnack) {
      useStore
        .getState()
        .successSnack(ctx.options.successMessage || "Operation successful!")
    }

    return result
  } catch (error) {
    const store = useStore.getState()

    if (ctx.options?.isHideErrorSnack !== true) {
      store.criticalSnack(String(error))
    }

    throw error
  }
}
