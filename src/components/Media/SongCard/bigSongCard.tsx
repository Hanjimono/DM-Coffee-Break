// System
import { cx } from "class-variance-authority"
import { motion } from "framer-motion"
import { twMerge } from "tailwind-merge"
import { useRef } from "react"
// components
import { useSettings } from "@/components/Helpers/Hooks"
import CardTags from "./cardTags"
import { useCardButtonActions, useCardHoverActions } from "./hooks"
// ui
import Beam from "@/ui/Layout/Beam"
import SmartImage from "@/ui/Presentation/SmartImage"
import Text from "@/ui/Presentation/Text"
import Button from "@/ui/Actions/Button"
import PortalPopupAppearTransition from "@/ui/Skeleton/Transition/PortalPopupAppearTransition"
// Styles and types
import { SongCardProps } from "./types"
import { SONG_CARD_SETTINGS_KEYS } from "@cross/constants/settingsMedia"

function BigSongCard({ info, className, isEdit, isHideTags }: SongCardProps) {
  const card = useRef(null)
  const [hovered, cardPosition, handleMouseEnter, handleMouseLeave] =
    useCardHoverActions(card)
  const [handlePlay, handleEdit, handleDelete] = useCardButtonActions(info)
  const settings = useSettings()
  const calculatedClassNames = twMerge(
    cx(
      "song-card group relative flex flex-1 flex-col bg-menu overflow-hidden min-w-52 max-w-52 min-h-72 max-h-72 rounded-xl",
      className
    )
  )
  const primary =
    settings &&
    settings.media.songCard[SONG_CARD_SETTINGS_KEYS.CARD_FULL_PRIMARY] ===
      "title"
      ? info.title
      : info.comment
  const secondary =
    settings &&
    settings.media.songCard[SONG_CARD_SETTINGS_KEYS.CARD_FULL_SECONDARY] ===
      "title"
      ? info.title
      : settings &&
          settings.media.songCard[
            SONG_CARD_SETTINGS_KEYS.CARD_FULL_SECONDARY
          ] === "comment"
        ? info.comment
        : info.artist
  return (
    <motion.div
      ref={card}
      className={calculatedClassNames}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.9 }}
      exit={{ opacity: 0 }}
      whileHover={isEdit ? undefined : { scale: 1.01, opacity: 1 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Beam className="p-2" withoutGap>
        <Beam className="pb-1">
          <Text className="text-xs" type="fit-line">
            {secondary}
          </Text>
        </Beam>
        <Beam className="opacity-30 text-xs">
          <Text className="text-xs" type="fit-line">
            Artist: {info.artist}
          </Text>
        </Beam>
        {!isEdit && (
          <div
            className={
              "flex absolute z-20 gap-close top-3 right-3 opacity-0 group-hover:opacity-100"
            }
          >
            <Button
              className="size-5"
              icon="edit"
              iconSize={18}
              text
              secondary
              isNoPadding
              onClick={handleEdit}
            />
            <Button
              className="size-5"
              icon="delete"
              iconSize={18}
              text
              remove
              isNoPadding
              onClick={handleDelete}
            />
          </div>
        )}
      </Beam>
      <Beam
        className={
          "relative p-2 min-w-36 max-w-36 min-h-36 max-h-36 overflow-hidden relative z-10 before:absolute before:top-3 before:left-3 before:w-full before:h-full before:bg-amber-950 ml-auto mr-auto -mt-2"
        }
        bottomGap="almost-same"
      >
        <SmartImage
          className="bg-slate-800 min-w-full max-w-full max-h-full z-10"
          src={info.thumbnail}
          alt={info.title}
        />
        {!isEdit && (
          <Button
            className={
              "absolute top-6 left-6 z-20 size-24 opacity-0 group-hover:opacity-100"
            }
            success
            icon="play_arrow"
            iconSize={64}
          />
        )}
      </Beam>
      <div className="p-2 flex flex-1 max-h-[5.5rem] w-full overflow-hidden">
        <Text
          className="w-full overflow-ellipsis inline-block line-clamp-3 font-bold"
          bold
        >
          {primary || info.title}
        </Text>
      </div>
      {!isHideTags && (
        <PortalPopupAppearTransition
          isActive={hovered && !!info.tags && info.tags.length > 0}
          autoReposition
          positionDirection="right"
          positionHorizontalOffset={10}
          parentPositionSettings={cardPosition}
        >
          <CardTags classNames="h-16 w-64" tags={info.tags} />
        </PortalPopupAppearTransition>
      )}
    </motion.div>
  )
}
export default BigSongCard
