"use client"
// system
import { useRouter } from "next/navigation"
// ui
import { formatClassnames } from "@/ui/Skeleton/utils"
import Modal from "@/ui/Navigation/Modal"
import Stack from "@/ui/Layout/Stack"
import Text from "@/ui/Presentation/Text"
import Inline from "@/ui/Layout/Inline"
import Button from "@/ui/Actions/Button"
// Styles and types
import { NewSongMethodModalProps } from "./types"

/**
 * Modal for selecting new song add method
 */
function NewSongMethodModal({ className, onClose }: NewSongMethodModalProps) {
  const calculatedClassNames = formatClassnames(
    "new-song-method-modal w-108 p-card",
    className
  )
  const router = useRouter()
  const handleChangeMethod = (method: "pc" | "web") => {
    onClose()
    if (method === "pc") {
      return router.push("/media/new/file")
    }
    return router.push("/media/new/parse")
  }
  return (
    <Modal
      title={"Add Song"}
      className={calculatedClassNames}
      onClose={onClose}
    >
      <Stack gap="distant">
        <Text>
          You can upload your own music files from PC or parse from WEB using
          popular music services
        </Text>
        <Inline className="justify-end">
          <Button onClick={() => handleChangeMethod("pc")}>
            Upload from PC
          </Button>
          <Button onClick={() => handleChangeMethod("web")} secondary>
            Parse from WEB
          </Button>
        </Inline>
      </Stack>
    </Modal>
  )
}
export default NewSongMethodModal
