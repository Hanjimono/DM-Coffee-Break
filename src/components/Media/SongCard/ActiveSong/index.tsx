// System
import { cx } from "class-variance-authority"
import { twMerge } from "tailwind-merge"
// Hooks
import { useCardButtonActions } from "./hooks"
// Components
import SongView from "@/components/Media/SongCard/SongView"
// Styles and types
import { ActiveSongCardProps } from "../types"

function ActiveSongCard({ className, info }: ActiveSongCardProps) {
  const calculatedClassNames = cx(twMerge("active-song-card", className))
  const [handlePlay, handleEdit, handleDelete] = useCardButtonActions(info)
  return (
    <SongView
      onPlay={handlePlay}
      onDelete={handleDelete}
      onEdit={handleEdit}
      className={calculatedClassNames}
      info={info}
    />
  )
}
export default ActiveSongCard
