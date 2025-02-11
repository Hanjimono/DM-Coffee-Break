"use client"
// System
import { cx } from "class-variance-authority"
import { twMerge } from "tailwind-merge"
import { motion } from "framer-motion"
import { useRef } from "react"
// Components
import { useCardButtonActions, useCardHoverActions } from "./hooks"
import CardTags from "./cardTags"
import BigSongCard from "./bigSongCard"
// Ui
import Beam from "@/ui/Layout/Beam"
import Button from "@/ui/Actions/Button"
import SmartImage from "@/ui/Presentation/SmartImage"
import Text from "@/ui/Presentation/Text"
import PortalPopupAppearTransition from "@/ui/Skeleton/Transition/PortalPopupAppearTransition"
// Constants
import {
  SONG_CARD_SETTINGS_KEYS,
  SONG_CARD_TYPES
} from "@cross/constants/settingsMedia"

// Styles and types
import { SongCardProps } from "./types"
import { useSettings } from "@/components/Helpers/Hooks"

function ShortSongCard({ className, info, isEdit }: SongCardProps) {
  const card = useRef<HTMLDivElement>(null)
  const [handlePlay, handleEdit, handleDelete] = useCardButtonActions(info)
  const [hovered, cardPosition, handleMouseEnter, handleMouseLeave] =
    useCardHoverActions(card)
  const settings = useSettings()
  const calculatedClassNames = twMerge(
    cx(
      "song-card group/main relative flex overflow-hidden box-border max-h-12 min-h-12 max-w-72 min-w-72 bg-menu rounded-xl",
      className
    )
  )
  const isShowTooltip =
    settings?.media.songCard[SONG_CARD_SETTINGS_KEYS.SONG_CARD_TYPE] ===
    SONG_CARD_TYPES.TOOLTIP
  const primary =
    settings &&
    settings.media.songCard[SONG_CARD_SETTINGS_KEYS.CARD_SHORT_PRIMARY] ===
      "title"
      ? info.title
      : info.comment
  const secondary =
    settings &&
    settings.media.songCard[SONG_CARD_SETTINGS_KEYS.CARD_SHORT_SECONDARY] ===
      "title"
      ? info.title
      : settings &&
          settings.media.songCard[
            SONG_CARD_SETTINGS_KEYS.CARD_SHORT_SECONDARY
          ] === "comment"
        ? info.comment
        : info.artist
  const hideSecondary =
    settings &&
    settings.media.songCard[
      SONG_CARD_SETTINGS_KEYS.CARD_SHORT_HIDE_SECONDARY
    ] === "true"
  return (
    <motion.div
      ref={card}
      layout
      className={calculatedClassNames}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.9 }}
      exit={{ opacity: 0 }}
      whileHover={isEdit ? undefined : { scale: 1.01, opacity: 1 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
              onClick={handlePlay}
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
              <Button icon="edit" secondary text onClick={handleEdit} />
              <Button icon="delete" remove text onClick={handleDelete} />
            </div>
          )}
        </div>
      </Beam>
      {isShowTooltip && (
        <PortalPopupAppearTransition
          isActive={hovered}
          autoReposition
          positionDirection="right"
          positionHorizontalOffset={10}
          parentPositionSettings={cardPosition}
        >
          <BigSongCard info={info} isEdit isHideTags />
        </PortalPopupAppearTransition>
      )}
      <PortalPopupAppearTransition
        style={{ width: card.current?.clientWidth }}
        isActive={hovered && !!info.tags && info.tags.length > 0}
        autoReposition
        positionDirection="bottom"
        positionVerticalOffset={10}
        parentPositionSettings={cardPosition}
      >
        <CardTags classNames="h-16 w-full" tags={info.tags} />
      </PortalPopupAppearTransition>
    </motion.div>
  )
}
export default ShortSongCard
