// system
import { cx } from "class-variance-authority"
// Components
import TagEditor from "@/components/Helpers/TagEditor"

export default function CardTags({
  tags,
  classNames
}: {
  tags: number[] | undefined
  classNames?: string
}) {
  if (!tags) {
    return null
  }
  return (
    <div className={cx("bg-menu rounded-lg shadow-lg")}>
      <TagEditor onSelectTag={() => {}} selectedTagIds={tags} isOnlyDisplay />
    </div>
  )
}
