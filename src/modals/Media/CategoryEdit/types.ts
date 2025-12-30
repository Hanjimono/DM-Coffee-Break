import { DefaultModalProps } from "@/constants/types/modals"
import { SaveMediaCategoryDTO } from "@cross/types/media/category"

export interface CategoryEditModalProps extends DefaultModalProps {
  type: "categoryEdit"
  /** Classes */
  className?: string
  /** Category data */
  data?: SaveMediaCategoryDTO
}
