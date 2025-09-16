import { DatabaseVersion } from "./version"
import {
  AVAILABLE_MEDIA_PLAYER_SETTINGS_API_KEYS,
  AVAILABLE_MEDIA_PLAYER_SETTINGS_BOT_KEYS,
  AVAILABLE_MEDIA_PLAYER_SETTINGS_CLIPBOARD_KEYS,
  AVAILABLE_MEDIA_PLAYER_TYPES,
  AVAILABLE_SONG_CARD_SETTINGS
} from "./media"
import { SETTINGS_CATEGORIES } from "@cross/constants/settingsCategories"

/** @deprecated use UserSettingsDTO instead */
export interface UserSettings {
  main: {
    version: DatabaseVersion
  }
  media: {
    songCard: Record<AVAILABLE_SONG_CARD_SETTINGS, string>
    player: {
      type: AVAILABLE_MEDIA_PLAYER_TYPES
      api: Record<AVAILABLE_MEDIA_PLAYER_SETTINGS_API_KEYS, string>
      clipboard: Record<AVAILABLE_MEDIA_PLAYER_SETTINGS_CLIPBOARD_KEYS, string>
      bot: Record<AVAILABLE_MEDIA_PLAYER_SETTINGS_BOT_KEYS, string>
    }
  }
}

//TODO: rename to UserSettings after removing the deprecated interface
export interface UserSettingsDomain {
  main: {
    version: DatabaseVersion
  }
  media: {
    songs: {
      card: {
        type: string
        full: {
          primary: string
          secondary: string
          isHideSecondary: boolean
          isHideTags: boolean
        }
        short: {
          primary: string
          secondary: string
          isHideSecondary: boolean
        }
      }
    }
    player: {
      type: string
      api: {
        playPrefix: string
        stopPrefix: string
        channelId: string
        webhookUrl: string
      }
      clipboard: {
        prefix: string
      }
      bot: {
        token: string
        channelId: string
        guildId: string
      }
    }
  }
}

type DotPrefix<T extends string> = T extends "" ? "" : `.${T}`

type Paths<T, Depth extends number = 3> = [Depth] extends [never]
  ? ""
  : T extends object
    ? {
        [K in keyof T & string]:
          | K
          | `${K}${DotPrefix<Paths<T[K], Prev[Depth]>>}`
      }[keyof T & string]
    : ""

type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8]

export type AvailableUserSettingsPaths = Paths<UserSettingsDomain, 6>

export type UserSettingsMapper = Record<string, AvailableUserSettingsPaths>

export type AvailableSettingsCategories =
  (typeof SETTINGS_CATEGORIES)[keyof typeof SETTINGS_CATEGORIES]
