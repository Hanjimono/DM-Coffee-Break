import dynamic from "next/dynamic"

/**
 * Dynamic import of CIpcProviderClientContainer with SSR disabled.
 * cIpcSDK uses browser-specific APIs, so it must only be loaded on the client side.
 **/
export const CIpcProviderContainer = dynamic(
  () =>
    import("./cIpcProviderContainer.client").then(
      (m) => m.CIpcProviderClientContainer
    ),
  { ssr: false }
)

export default CIpcProviderContainer
