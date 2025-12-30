import { ParsedSongInfo } from "@cross/types/media/song"

/** Props for the ParseSongInput component */
export interface ParseSongInputProps {
  /** Callback function to handle the parsed song information */
  onParse: (info: ParsedSongInfo) => void
  /** Flag to indicate if parsing form is active */
  isParseActive: boolean
  /** Default URL to populate the input field */
  defaultUrl?: string
}
