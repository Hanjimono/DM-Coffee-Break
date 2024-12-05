import { UserSettings } from "@cross/types/database/settings"
import { MEDIA_PLAYER_TYPES } from "./media"

export const DEFAULT_USER_SETTINGS: UserSettings = {
  main: {
    version: "0.0.0"
  },
  media: {
    songCard: {
      "card-full-hide-secondary": "false",
      "card-full-hide-tags": "false",
      "card-full-primary": "title",
      "card-full-secondary": "comment",
      "card-short-hide-secondary": "false",
      "card-short-primary": "title",
      "card-short-secondary": "comment",
      "song-card-type": "short"
    },
    player: {
      type: MEDIA_PLAYER_TYPES.CLIPBOARD,
      api: {
        "channel-id": "",
        "play-prefix": "play",
        "stop-prefix": "stop",
        "webhook-url": ""
      },
      clipboard: {
        "media-player-clipboard-prefix": ""
      },
      bot: {
        "bot-token": ""
      }
    }
  }
}
