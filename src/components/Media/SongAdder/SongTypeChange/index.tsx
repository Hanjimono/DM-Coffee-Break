// Constants
import { MEDIA_TYPES } from "@cross/database/constants/media"
// Components
import LinkBlock from "@/components/Navigation/LinkBlock"
// ui
import Beam from "@/ui/Layout/Beam"
// Styles and types
import { SongTypeChangeProps } from "./types"

function SongTypeChange({ onChange }: SongTypeChangeProps) {
  return (
    <Beam whole contentJustify="center" contentAlign="center">
      <LinkBlock
        title="Upload from PC"
        image="/public/images/media_upload.png"
        description="Upload your own music files"
        big
        onClick={() => onChange(MEDIA_TYPES.UPLOAD)}
      />
      <LinkBlock
        title="Parse from Web"
        image="/public/images/media_parse.png"
        description="Use popular music services"
        big
        onClick={() => onChange(MEDIA_TYPES.PARSED)}
      />
    </Beam>
  )
}
export default SongTypeChange
