"use client"
// system
import { useState } from "react"
// utils
import { useCIpc } from "@/components/Containers/CIpcProvider/cIpcProviderContainer.client"
// ui
import { formatClassnames } from "@/ui/Skeleton/utils"
import Input from "@/ui/Form/Input"
// constants
import { MEDIA_SOURCES } from "@cross/constants/media"
// Styles and types
import { SongFileInputProps } from "./types"

/**
 * Renders a file input for selecting a song file.
 * It allows the user to select a song file from the file system.
 * After selecting a file, the song information is parsed and the callback function is called with the parsed song information.
 * If parse mode is not active, the file input is disabled and the user cannot select a file.
 *
 * @param defaultUrl - Default URL of the selected file
 * @param isParseActive - Flag to indicate if the parse form is active
 * @param onParse - Callback function to handle the parsed song information
 * @returns
 */
function SongFileInput({
  defaultUrl,
  isParseActive,
  onParse
}: SongFileInputProps) {
  const [selectedFile, setSelectedFile] = useState(defaultUrl || "")
  const cIpc = useCIpc()
  const fileOpen = cIpc.filesHandler.openSelectFileDialog()
  const parseSong = cIpc.songParser.parseSongInfo()
  const handleFileSelect = async () => {
    if (!isParseActive) return
    const filePath = await fileOpen.saveMutateAsync()
    if (filePath) {
      setSelectedFile(filePath)
      const songInfo = await parseSong.saveMutateAsync({
        url: filePath,
        source: MEDIA_SOURCES.PC
      })
      if (songInfo) {
        onParse(songInfo)
      }
    }
  }
  return (
    <div
      className={formatClassnames(
        "w-100 flex justify-center items-center",
        isParseActive && "cursor-pointer"
      )}
      onClick={handleFileSelect}
    >
      <Input
        name="file"
        label="Upload Song File"
        noMouseEvent
        value={selectedFile}
        onClear={() => setSelectedFile("")}
        clearable={isParseActive && selectedFile !== ""}
        endIcon="description"
      />
    </div>
  )
}
export default SongFileInput
