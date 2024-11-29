"use client"
// System
import { cx } from "class-variance-authority"
import { twMerge } from "tailwind-merge"
import { motion } from "framer-motion"
// Ui
import Beam from "@/ui/Layout/Beam"
import Button from "@/ui/Actions/Button"
import SmartImage from "@/ui/Presentation/SmartImage"
import Text from "@/ui/Presentation/Text"
// Constants
import { SONG_CARD_SETTINGS_KEYS } from "@cross/constants/settingsMedia"

// Styles and types
import { SongCardProps } from "./types"

function ShortSongCard({ className, info, settings, isEdit }: SongCardProps) {
  const calculatedClassNames = twMerge(
    cx(
      "song-card group/main relative flex overflow-hidden box-border max-h-12 min-h-12 max-w-72 min-w-72 bg-menu rounded-xl",
      className
    )
  )
  const primary =
    settings && settings[SONG_CARD_SETTINGS_KEYS.CARD_SHORT_PRIMARY] === "title"
      ? info.title
      : info.comment
  const secondary =
    settings &&
    settings[SONG_CARD_SETTINGS_KEYS.CARD_SHORT_SECONDARY] === "title"
      ? info.title
      : settings &&
          settings[SONG_CARD_SETTINGS_KEYS.CARD_SHORT_SECONDARY] === "comment"
        ? info.comment
        : info.artist
  const hideSecondary =
    settings &&
    settings[SONG_CARD_SETTINGS_KEYS.CARD_SHORT_HIDE_SECONDARY] === "true"
  return (
    <motion.div
      layout
      className={calculatedClassNames}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.9 }}
      exit={{ opacity: 0 }}
      whileHover={isEdit ? undefined : { scale: 1.01, opacity: 1 }}
    >
      <Beam withoutGap withoutWrap contentAlign="center">
        <div className={"min-w-12 min-h-12 max-w-12 max-h-12"}>
          <SmartImage
            className="max-w-full"
            src={info.thumbnail}
            alt={info.title}
          />
          {!isEdit && (
            <Button
              className={
                "absolute left-1 top-1 opacity-0 group-hover/main:opacity-100 transition-opacity"
              }
              success
              icon="play_arrow"
            />
          )}
        </div>
        <div className={"flex group flex-col w-full px-2 py-1 overflow-hidden"}>
          <div className={"flex font-bold"}>
            <Text type="fit-line" bold>
              {primary || info.title}
            </Text>
          </div>
          {!hideSecondary && secondary && (
            <div className={"opacity-90"}>
              <Text type="fit-line" size="small">
                {secondary}
              </Text>
            </div>
          )}
          {!isEdit && (
            <div
              className={
                "absolute right-1 top-1 flex opacity-0 group-hover:opacity-100 transition-opacity"
              }
            >
              <Button icon="edit" secondary text />
              <Button icon="delete" remove text />
            </div>
          )}
        </div>
      </Beam>
    </motion.div>
  )
}
export default ShortSongCard
