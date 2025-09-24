import {
  UserSettings,
  UserSettingsMapper
} from "@cross/types/database/settings"
import { MEDIA_PLAYER_TYPES } from "./media"
import {
  MEDIA_PLAYER_SETTINGS_API_KEYS,
  MEDIA_PLAYER_SETTINGS_BOT_KEYS,
  MEDIA_PLAYER_SETTINGS_CLIPBOARD_KEYS,
  MEDIA_PLAYER_SETTINGS_TYPE_KEY,
  SONG_CARD_SETTINGS_KEYS
} from "./settingsMedia"
import { SETTING_DATABASE_VERSION_KEY } from "./mainSettings"

/**
 * The default user settings for the application in a structured domain format.
 */
export const DEFAULT_USER_SETTINGS: UserSettings = {
  main: {
    version: "0.0.0"
  },
  media: {
    songs: {
      card: {
        type: "short",
        full: {
          primary: "title",
          secondary: "comment",
          isHideSecondary: false,
          isHideTags: false
        },
        short: {
          primary: "title",
          secondary: "comment",
          isHideSecondary: false
        }
      }
    },
    player: {
      type: MEDIA_PLAYER_TYPES.CLIPBOARD,
      api: {
        playPrefix: "play",
        stopPrefix: "stop",
        channelId: "",
        webhookUrl: ""
      },
      clipboard: {
        prefix: ""
      },
      bot: {
        token: "",
        channelId: "",
        guildId: ""
      }
    }
  }
} as const

/**
 * A mapping object to convert between database keys and UserSettings structure.
 */
export const USER_SETTINGS_DB_MAPPER: UserSettingsMapper = {
  [SETTING_DATABASE_VERSION_KEY]: "main.version",
  // song card settings
  [SONG_CARD_SETTINGS_KEYS.SONG_CARD_TYPE]: "media.songs.card.type",
  [SONG_CARD_SETTINGS_KEYS.CARD_FULL_PRIMARY]: "media.songs.card.full.primary",
  [SONG_CARD_SETTINGS_KEYS.CARD_FULL_SECONDARY]:
    "media.songs.card.full.secondary",
  [SONG_CARD_SETTINGS_KEYS.CARD_FULL_HIDE_SECONDARY]:
    "media.songs.card.full.isHideSecondary",
  [SONG_CARD_SETTINGS_KEYS.CARD_FULL_HIDE_TAGS]:
    "media.songs.card.full.isHideTags",
  [SONG_CARD_SETTINGS_KEYS.CARD_SHORT_PRIMARY]:
    "media.songs.card.short.primary",
  [SONG_CARD_SETTINGS_KEYS.CARD_SHORT_SECONDARY]:
    "media.songs.card.short.secondary",
  [SONG_CARD_SETTINGS_KEYS.CARD_SHORT_HIDE_SECONDARY]:
    "media.songs.card.short.isHideSecondary",
  // media player type
  [MEDIA_PLAYER_SETTINGS_TYPE_KEY]: "media.player.type",
  // media player api settings
  [MEDIA_PLAYER_SETTINGS_API_KEYS.PLAY_PREFIX]: "media.player.api.playPrefix",
  [MEDIA_PLAYER_SETTINGS_API_KEYS.STOP_PREFIX]: "media.player.api.stopPrefix",
  [MEDIA_PLAYER_SETTINGS_API_KEYS.CHANNEL_ID]: "media.player.api.channelId",
  [MEDIA_PLAYER_SETTINGS_API_KEYS.WEBHOOK_URL]: "media.player.api.webhookUrl",
  // media player clipboard settings
  [MEDIA_PLAYER_SETTINGS_CLIPBOARD_KEYS.PREFIX]:
    "media.player.clipboard.prefix",
  // media player bot settings
  [MEDIA_PLAYER_SETTINGS_BOT_KEYS.BOT_TOKEN]: "media.player.bot.token",
  [MEDIA_PLAYER_SETTINGS_BOT_KEYS.BOT_CHANNEL_ID]: "media.player.bot.channelId",
  [MEDIA_PLAYER_SETTINGS_BOT_KEYS.BOT_GUILD_ID]: "media.player.bot.guildId"
}
