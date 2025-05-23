import { UserSettings } from "@cross/types/database/settings"
import { MEDIA_PLAYER_TYPES } from "./media"
import {
  MEDIA_PLAYER_SETTINGS_API_KEYS,
  MEDIA_PLAYER_SETTINGS_BOT_KEYS,
  MEDIA_PLAYER_SETTINGS_CLIPBOARD_KEYS,
  SONG_CARD_SETTINGS_KEYS
} from "./settingsMedia"

export const DEFAULT_USER_SETTINGS: UserSettings = {
  main: {
    version: "0.0.0"
  },
  media: {
    songCard: {
      [SONG_CARD_SETTINGS_KEYS.CARD_FULL_HIDE_SECONDARY]: "false",
      [SONG_CARD_SETTINGS_KEYS.CARD_FULL_HIDE_TAGS]: "false",
      [SONG_CARD_SETTINGS_KEYS.CARD_FULL_PRIMARY]: "title",
      [SONG_CARD_SETTINGS_KEYS.CARD_FULL_SECONDARY]: "comment",
      [SONG_CARD_SETTINGS_KEYS.CARD_SHORT_HIDE_SECONDARY]: "false",
      [SONG_CARD_SETTINGS_KEYS.CARD_SHORT_PRIMARY]: "title",
      [SONG_CARD_SETTINGS_KEYS.CARD_SHORT_SECONDARY]: "comment",
      [SONG_CARD_SETTINGS_KEYS.SONG_CARD_TYPE]: "short"
    },
    player: {
      type: MEDIA_PLAYER_TYPES.CLIPBOARD,
      api: {
        [MEDIA_PLAYER_SETTINGS_API_KEYS.CHANNEL_ID]: "",
        [MEDIA_PLAYER_SETTINGS_API_KEYS.PLAY_PREFIX]: "play",
        [MEDIA_PLAYER_SETTINGS_API_KEYS.STOP_PREFIX]: "stop",
        [MEDIA_PLAYER_SETTINGS_API_KEYS.WEBHOOK_URL]: ""
      },
      clipboard: {
        [MEDIA_PLAYER_SETTINGS_CLIPBOARD_KEYS.PREFIX]: ""
      },
      bot: {
        [MEDIA_PLAYER_SETTINGS_BOT_KEYS.BOT_TOKEN]: "",
        [MEDIA_PLAYER_SETTINGS_BOT_KEYS.BOT_GUILD_ID]: "",
        [MEDIA_PLAYER_SETTINGS_BOT_KEYS.BOT_CHANNEL_ID]: ""
      }
    }
  }
}
