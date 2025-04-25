// System
import { cx } from "class-variance-authority"
import { twMerge } from "tailwind-merge"
// Components
import TagEditor from "@/components/Helpers/TagEditor"
// Hooks
import { useDurationInMinutes, useSongTexts, useToggleDetails } from "./hooks"
// Ui
import Icon from "@/ui/Presentation/Icon"
import Brick from "@/ui/Layout/Brick"
import SmartImage from "@/ui/Presentation/SmartImage"
import Text from "@/ui/Presentation/Text"
import Button from "@/ui/Actions/Button"
// Styles and types
import {
  SongActionsViewProps,
  SongDetailsViewProps,
  SongThumbnailViewProps,
  SongViewProps
} from "../types"

/**
 * The `SongView` component is responsible for rendering a song card with its details,
 * including the title, artist, thumbnail, and actions such as play, edit, and delete.
 * It also supports toggling the visibility of additional song details.
 *
 * @param {string} props.className - Additional CSS class names to style the component.
 * @param {SongInfo} props.info - The song information, including title, artist, thumbnail, and comments.
 * @param {() => void} props.onPlay - Callback function triggered when the play action is invoked.
 * @param {() => void} props.onDelete - Callback function triggered when the delete action is invoked.
 * @param {() => void} props.onEdit - Callback function triggered when the edit action is invoked.
 */
function SongView({
  className,
  info,
  onPlay,
  onDelete,
  onEdit,
  isOnlyBaseInfo = false,
  isTransparent = false
}: SongViewProps) {
  const calculatedClassNames = cx(
    twMerge(
      "song-view group/main flex flex-col px-6 py-3",
      !isOnlyBaseInfo && "cursor-pointer hover:bg-block-800",
      isTransparent && "bg-transparent",
      className
    )
  )
  const [isOpenDetails, toggleDetails] = useToggleDetails(isOnlyBaseInfo)
  const [primaryText, secondaryText, isShowTitleInDetails] = useSongTexts(
    info.title,
    info.artist,
    info.comment
  )
  return (
    <Brick
      className={calculatedClassNames}
      noPadding
      onClick={toggleDetails}
      durability={7}
    >
      <div className="song-title flex w-full items-center">
        <SongThumbnailView
          alt={info.title}
          thumbnail={info.thumbnail}
          onPlay={onPlay}
        />
        <div className="song-text flex flex-col flex-1 px-3.5 overflow-hidden">
          <Text type="fit-line" bold>
            {primaryText}
          </Text>
          <Text size="small" className="text-title">
            {secondaryText}
          </Text>
        </div>
        {!isOnlyBaseInfo && (
          <SongActionsView
            duration={32}
            className="pr-12"
            onDelete={onDelete}
            onEdit={onEdit}
          />
        )}
        {!isOnlyBaseInfo && (
          <div className="song-details-icon">
            {!isOpenDetails && (
              <Icon
                type="custom"
                alt="arrow_down"
                customIconLink="/public/images/arrow_down.png"
                height={5}
                width={10}
              />
            )}
            {isOpenDetails && (
              <Icon
                type="custom"
                alt="arrow_up"
                customIconLink="/public/images/arrow_up.png"
                height={5}
                width={10}
              />
            )}
          </div>
        )}
      </div>
      {isOpenDetails && (
        <SongDetailsView
          info={info}
          isShowTitleInDetails={isShowTitleInDetails}
        />
      )}
    </Brick>
  )
}

/**
 * Renders a song thumbnail view with optional play functionality.
 *
 * @param {string} props.alt - The alt text for the thumbnail image.
 * @param {string} props.thumbnail - The source URL of the thumbnail image.
 * @param {string} [props.className] - Additional CSS classes to apply to the container.
 * @param {() => void} [props.onPlay] - Callback function triggered when the play button is clicked.
 */
function SongThumbnailView({
  alt,
  thumbnail,
  className,
  onPlay
}: SongThumbnailViewProps) {
  return (
    <div
      className={cx(
        twMerge(
          "song-image bg-block-200 w-9 h-9 rounded-xl overflow-hidden relative",
          className
        )
      )}
    >
      {thumbnail && <SmartImage alt={alt} src={thumbnail} />}
      {onPlay && (
        <div className="absolute top-0 left-0 w-full h-full hidden items-center justify-center bg-gray-900/70 group-hover/main:flex">
          <Button
            icon="/public/images/play_song.png"
            iconSize={24}
            iconType="custom"
            onClick={onPlay}
            text
            isNoPadding
          />
        </div>
      )}
    </div>
  )
}

/**
 * Displays the song duration in minutes if available.
 * Shows edit and delete buttons when corresponding callbacks are provided.
 * Buttons are visible on hover if actions are available.
 *
 * @param {string} [props.className] - Additional class names to style the component.
 * @param {number} props.duration - The duration of the song in seconds.
 * @param {() => void} [props.onDelete] - Callback function triggered when the delete action is clicked.
 * @param {() => void} [props.onEdit] - Callback function triggered when the edit action is clicked.
 */
function SongActionsView({
  className,
  duration,
  onDelete,
  onEdit
}: SongActionsViewProps) {
  const formattedDurationInMinutes = useDurationInMinutes(duration)
  const isHaveActions = !!onDelete || !!onEdit
  return (
    <div className={cx(twMerge("song-actions", className))}>
      {!!formattedDurationInMinutes && (
        <Text
          size="small"
          className={cx(
            twMerge("text-title", isHaveActions && "group-hover/main:hidden")
          )}
        >
          {formattedDurationInMinutes}
        </Text>
      )}
      {isHaveActions && (
        <div className="hidden group-hover/main:flex gap-close">
          {onEdit && (
            <Button
              className="w-fit"
              icon="/public/images/song_edit.png"
              iconSize={18}
              iconType="custom"
              onClick={onEdit}
              text
              isNoPadding
              isCustomSize
            />
          )}
          {onDelete && (
            <Button
              className="w-fit"
              icon="/public/images/song_delete.png"
              iconSize={18}
              iconType="custom"
              onClick={onDelete}
              text
              isNoPadding
              isCustomSize
            />
          )}
        </div>
      )}
    </div>
  )
}

/**
 * Displays detailed information about a song, including its title, artist, description, and tags.
 *
 * @param {string} [props.className] - Optional additional CSS class names to apply to the component.
 * @param {Object} props.info - The song information to display.
 */
function SongDetailsView({
  className,
  info,
  isShowTitleInDetails = false
}: SongDetailsViewProps) {
  return (
    <div className="song-content">
      <div className="song-title-info pt-3">
        <Text clip bold className="text-title">
          {isShowTitleInDetails ? info.title : info.artist}
        </Text>
        {!isShowTitleInDetails && info.artist && (
          <Text className="ml-2" size="extra-small">
            by {info.artist}
          </Text>
        )}
      </div>
      <div className="song-description pt-2 text-sm">{info.comment}</div>
      {!!info.tags && (
        <TagEditor
          onSelectTag={() => {}}
          selectedTagIds={info.tags}
          isOnlyDisplay
        />
      )}
    </div>
  )
}

export default SongView
