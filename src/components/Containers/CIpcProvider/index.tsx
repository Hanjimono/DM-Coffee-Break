import dynamic from "next/dynamic"
import LoadingScreen from "../LoadingScreen"

/**
 * Dynamic import of CIpcProviderClientContainer with SSR disabled.
 * cIpcSDK uses browser-specific APIs, so it must only be loaded on the client side.
 **/
export const CIpcProviderContainer = dynamic(
  () =>
    import("./cIpcProviderContainer.client").then(
      (m) => m.CIpcProviderClientContainer
    ),
  { ssr: false, loading: () => <LoadingScreen loaded={false} /> }
)

export default CIpcProviderContainer
