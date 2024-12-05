export const SONG_CARD_TYPES = {
  SHORT: "short",
  FULL: "full",
  TOOLTIP: "tooltip"
} as const

export const SONG_CARD_SETTINGS_KEYS = {
  SONG_CARD_TYPE: "song-card-type",
  CARD_SHORT_PRIMARY: "card-short-primary",
  CARD_SHORT_SECONDARY: "card-short-secondary",
  CARD_SHORT_HIDE_SECONDARY: "card-short-hide-secondary",
  CARD_FULL_PRIMARY: "card-full-primary",
  CARD_FULL_SECONDARY: "card-full-secondary",
  CARD_FULL_HIDE_SECONDARY: "card-full-hide-secondary",
  CARD_FULL_HIDE_TAGS: "card-full-hide-tags"
} as const

export const MEDIA_PLAYER_SETTINGS_TYPE_KEY = "media-player-type" as const

export const MEDIA_PLAYER_SETTINGS_API_KEYS = {
  PLAY_PREFIX: "media-player-api-play-prefix",
  STOP_PREFIX: "media-player-api-stop-prefix",
  CHANNEL_ID: "media-player-api-channel-id",
  WEBHOOK_URL: "media-player-api-webhook-url"
} as const

export const MEDIA_PLAYER_SETTINGS_CLIPBOARD_KEYS = {
  PREFIX: "media-player-clipboard-prefix"
} as const

export const MEDIA_PLAYER_SETTINGS_BOT_KEYS = {
  BOT_TOKEN: "media-player-bot-token"
} as const
