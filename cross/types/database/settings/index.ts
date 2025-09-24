import { DatabaseVersion } from "./version"
import { SETTINGS_CATEGORIES } from "@cross/constants/settingsCategories"
export interface UserSettings {
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
      type: number
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

export type AvailableUserSettingsPaths = Paths<UserSettings, 6>

export type UserSettingsMapper = Record<string, AvailableUserSettingsPaths>

export type AvailableSettingsCategories =
  (typeof SETTINGS_CATEGORIES)[keyof typeof SETTINGS_CATEGORIES]
