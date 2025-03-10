import FEATURE_FLAGS from "@cross/constants/featureFlags"

export type AvailableFeatureFlags =
  (typeof FEATURE_FLAGS)[keyof typeof FEATURE_FLAGS]
