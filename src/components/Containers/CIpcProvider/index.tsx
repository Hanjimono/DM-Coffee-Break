"use client"
import { createContext, useContext } from "react"
import { createCIpcSdk } from "@/cIpc"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { cIpcHandler } from "@cross/types/handlers/main"
import { cIpcSDKApi } from "@/cIpc/types"
import { cIpcSpecification } from "@/cIpc/spec"
import { loggingMiddleware } from "@/cIpc/middleware/logging"
import { snackbarMiddleware } from "@/cIpc/middleware/snackbar"

/**
 * Create a new QueryClient instance.
 * @returns A new QueryClient.
 */
const createQueryClient = () => new QueryClient()

/**
 * Singleton QueryClient for client-side usage.
 */
let clientQueryClientSingleton: QueryClient | undefined = undefined

/**
 * Singleton cIpcHandler instance from the preload script.
 */
let cIpcSingleton: cIpcHandler | undefined = undefined

/**
 * Get the appropriate QueryClient.
 * Creates a new one for server-side, reuses singleton for client-side.
 * @returns A QueryClient instance.
 */
const getQueryClient = () => {
  if (typeof window === "undefined") {
    return createQueryClient()
  }
  return (clientQueryClientSingleton ??= createQueryClient())
}

/**
 * Get the cIpcHandler instance.
 * Uses singleton for client-side, undefined for server-side.
 * @returns The cIpcHandler instance.
 */
const getIpcHandler = () => {
  if (typeof window === "undefined") {
    return cIpcSingleton
  }
  return (cIpcSingleton ??= (window as any).ipcHandler)
}

/** Context for cIpc SDK */
const CIpcContext = createContext<cIpcSDKApi | null>(null)

/** Hook to access the cIpc SDK from context */
export const useCIpc = () => {
  const context = useContext(CIpcContext)
  if (!context)
    throw new Error("useCIpc must be used within <CIpcProviderContainer>")
  return context
}

/** Provider component for cIpc SDK */
export default function CIpcProviderContainer({
  children,
  headers
}: {
  children?: React.ReactNode
  headers?: Headers
}) {
  const queryClient = getQueryClient()
  const ipcHandler = getIpcHandler()
  let api = null
  if (ipcHandler) {
    api = createCIpcSdk(ipcHandler, cIpcSpecification, [
      loggingMiddleware,
      snackbarMiddleware
    ])
  }
  return (
    <QueryClientProvider client={queryClient}>
      <CIpcContext.Provider value={api}>{children}</CIpcContext.Provider>
    </QueryClientProvider>
  )
}
