import { useSettings } from "@/components/Helpers/Hooks"
import { SONG_CARD_SETTINGS_KEYS } from "@cross/constants/settingsMedia"
import { useMemo, useState } from "react"

export function useDurationInMinutes(duration?: number) {
  return useMemo(() => {
    if (duration) {
      const minutes = Math.floor(duration / 60)
      const seconds = duration % 60
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
    }
    return ""
  }, [duration])
}

export function useToggleDetails(
  isOnlyBaseInfo: boolean
): [boolean, (event: React.MouseEvent) => void] {
  const [isOpenDetails, setIsOpenDetails] = useState(false)
  const toggleDetails = (event: React.MouseEvent) => {
    if (isOnlyBaseInfo) return
    event.stopPropagation()
    setIsOpenDetails((prev) => !prev)
  }
  return [isOpenDetails, toggleDetails]
}

export function useSongTexts(
  title?: string,
  artist?: string,
  comment?: string
) {
  const settings = useSettings()
  return useMemo(() => {
    const primaryText =
      settings &&
      settings.media.songCard[SONG_CARD_SETTINGS_KEYS.CARD_SHORT_PRIMARY] ===
        "title"
        ? title
        : comment
    const secondaryText =
      settings &&
      settings.media.songCard[SONG_CARD_SETTINGS_KEYS.CARD_SHORT_SECONDARY] ===
        "title"
        ? title
        : settings &&
            settings.media.songCard[
              SONG_CARD_SETTINGS_KEYS.CARD_SHORT_SECONDARY
            ] === "comment"
          ? comment
          : artist
    const isShowTitleInDetails = ![primaryText, secondaryText].includes(title)
    return [primaryText, secondaryText, isShowTitleInDetails] as const
  }, [title, artist, comment, settings])
}
