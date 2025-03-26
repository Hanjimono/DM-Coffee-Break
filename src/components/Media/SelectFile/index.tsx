"use client"
// System
import { twMerge } from "tailwind-merge"
import { cx } from "class-variance-authority"
// ui
import Input from "@/ui/Form/Input"
// types and styles
import { SelectFileProps } from "./types"
import { useFileHandler } from "@/components/Helpers/Hooks"

function SelectFile({
  name,
  label = "Select file",
  disabled,
  loading,
  onFileChange,
  file,
  className
}: SelectFileProps) {
  const fileHandler = useFileHandler()
  const handleInputClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement
    if (target && target.closest(".input-clear-button")) {
      return
    }
    const fileName = await fileHandler.openSelectFileDialog()
    onFileChange(fileName)
  }
  return (
    <div
      className={twMerge(
        cx("select cursor-pointer", disabled && "cursor-default", className)
      )}
      onClick={handleInputClick}
    >
      <Input
        name={name}
        endIcon="description"
        label={label}
        noMouseEvent
        value={file}
        clearable
        loading={loading}
        onClear={() => onFileChange(undefined)}
      />
    </div>
  )
}

export default SelectFile
