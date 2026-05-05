import { useSettings } from "@/components/Helpers/Hooks"
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
    const shortSettings = settings.media.songs.card.short
    const primaryText =
      shortSettings.primary === "title" ? title : comment
    const secondaryText =
      shortSettings.secondary === "title"
        ? title
        : shortSettings.secondary === "comment"
          ? comment
          : artist
    const isShowTitleInDetails = ![primaryText, secondaryText].includes(title)
    return [primaryText, secondaryText, isShowTitleInDetails] as const
  }, [title, artist, comment, settings])
}
