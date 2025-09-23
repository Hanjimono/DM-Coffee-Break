// ui
import { formatClassnames } from "@/ui/Skeleton/utils"
import Note from "@/ui/Presentation/Note"
// Styles and types
import { DesignedNoteProps } from "./types"

function DesignedNote({
  children,
  className,
  type = "info",
  ...rest
}: DesignedNoteProps) {
  // background: linear-gradient(90deg, #DF6979 33.5%, #FF8177 100%);
  const calculatedClassNames = formatClassnames(
    "designed-note px-step-sm py-step-3xs text-accent",
    type == "info" && "bg-[#FF936F80]",
    type == "warning" &&
      "bg-linear-to-r from-[#DF6979] from-[33.5%] to-[#FF8177] to-100%",
    className
  )
  return (
    <Note className={calculatedClassNames} {...rest}>
      {children}
    </Note>
  )
}
export default DesignedNote
