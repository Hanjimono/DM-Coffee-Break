/** List of feature flags that can be toggled on/off */
export const FEATURE_FLAGS = {
  /** Whether the app should show the games page */
  GAMES: "games"
} as const

/** Settings for feature flags */
export const FEATURE_FLAGS_SETTINGS: Record<
  (typeof FEATURE_FLAGS)[keyof typeof FEATURE_FLAGS],
  boolean
> = {
  [FEATURE_FLAGS.GAMES]: true
} as const

export default FEATURE_FLAGS
