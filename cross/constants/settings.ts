import { UserSettings } from "@cross/types/database/settings"

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
    }
  }
}
