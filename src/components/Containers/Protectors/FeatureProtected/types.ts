import { AvailableFeatureFlags } from "@cross/types/featureFlags"

export interface FeatureProtectedProps {
  /** React children */
  children: React.ReactNode
  /** The feature flag to check for */
  feature: AvailableFeatureFlags
  /** The type of protected children, page will be redirected to home and component will be rendered as null*/
  type?: "component" | "page"
}
