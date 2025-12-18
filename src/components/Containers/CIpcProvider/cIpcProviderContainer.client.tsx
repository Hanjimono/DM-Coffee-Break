"use client"
// system
import { createContext, useContext, useMemo } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
// cIpc
import { createCIpcSdk } from "@/cIpc"
import { cIpcSpecification } from "@/cIpc/spec"
import { loggingMiddleware } from "@/cIpc/middleware/logging"
import { snackbarMiddleware } from "@/cIpc/middleware/snackbar"
import { tracingMiddleware } from "@/cIpc/middleware/tracing"
// types
import { cIpcHandler } from "@cross/types/handlers/main"
import { cIpcSDKApi } from "@/cIpc/types"

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

const getUserConfig = () => {
  if (typeof window === "undefined") {
    return {}
  }
  return (window as any).cIpcEnv?.userConfig || {}
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
export function CIpcProviderClientContainer({
  children,
  headers
}: {
  children?: React.ReactNode
  headers?: Headers
}) {
  const queryClient = getQueryClient()
  const ipcHandler = getIpcHandler()
  const userConfig = getUserConfig()
  const api = useMemo(() => {
    return createCIpcSdk<cIpcHandler, typeof cIpcSpecification>(
      ipcHandler,
      cIpcSpecification,
      queryClient,
      [tracingMiddleware, loggingMiddleware, snackbarMiddleware],
      [],
      userConfig
    )
  }, [ipcHandler, userConfig, queryClient])
  return (
    <QueryClientProvider client={queryClient}>
      <CIpcContext.Provider value={api}>{children}</CIpcContext.Provider>
    </QueryClientProvider>
  )
}
