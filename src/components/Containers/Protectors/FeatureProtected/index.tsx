// System
import { redirect } from "next/navigation"
// Types ans styles
import { FEATURE_FLAGS_SETTINGS } from "@cross/constants/featureFlags"
import { FeatureProtectedProps } from "./types"

/**
 * A component that conditionally renders its children based on feature flag settings.
 * If the feature is disabled and the type is "page", the user is redirected to the home page.
 * If the feature is disabled and the type is "component", the children are not rendered.
 *
 * @param {React.ReactNode} props.children - The child components to be rendered if the feature is enabled.
 * @param {string} props.feature - The feature flag to check.
 * @param {string} [props.type="component"] - The type of the protected element, either "component" or "page".
 */
const FeatureProtected = ({
  children,
  feature,
  type = "component"
}: FeatureProtectedProps) => {
  const isFeatureEnabled = FEATURE_FLAGS_SETTINGS[feature]
  if (!isFeatureEnabled) {
    if (type === "page") {
      return redirect("/home")
    }
    return null
  }
  return <>{children}</>
}

export default FeatureProtected
