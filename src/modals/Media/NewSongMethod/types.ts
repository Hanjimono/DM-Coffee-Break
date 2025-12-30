import { DefaultModalProps } from "@/constants/types/modals"

export interface NewSongMethodModalProps extends DefaultModalProps {
  type: "newSongMethod"
  /** Classes */
  className?: string
}
