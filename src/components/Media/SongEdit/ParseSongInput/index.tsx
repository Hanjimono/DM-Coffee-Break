"use client"
// system
import * as zod from "zod"
// utils
import { useCIpc } from "@/components/Containers/CIpcProvider/cIpcProviderContainer.client"
// ui
import Form from "@/ui/Form/Form"
import Input from "@/ui/Form/Input"
import { FormElementLine } from "@/ui/Form/FormElementWrapper"
import FormSubmit from "@/ui/Form/FormSubmit"
// Styles and types
import { ParseSongInputProps } from "./types"

const schema = zod.object({
  url: zod.string().url("Please enter a valid URL")
})

/**
 * Renders a form for parsing song information from a URL.
 * It allows the user to enter a URL and parse the song information.
 * If parse mode is not active, the form is disabled and the user cannot parse the song information.
 *
 * @param isParseActive - Flag to indicate if the parse form is active
 * @param onParse - Callback function to handle the parsed song information
 * @param defaultUrl - Default URL to populate the input field
 * @returns
 */
function ParseSongInput({
  isParseActive,
  onParse,
  defaultUrl
}: ParseSongInputProps) {
  const cIpc = useCIpc()
  const parseSong = cIpc.songParser.parseSongInfo()
  const handleParse = async (data: zod.infer<typeof schema>) => {
    if (!isParseActive) return
    const songInfo = await parseSong.saveMutateAsync({ url: data.url })
    if (songInfo) {
      onParse(songInfo)
    }
  }
  return (
    <Form
      onSubmit={handleParse}
      validationSchema={schema}
      defaultValues={{
        url: defaultUrl || ""
      }}
    >
      <FormElementLine>
        <Input name="url" label="Song URL" loading={parseSong.isPending} />
        {isParseActive && (
          <FormSubmit disabled={parseSong.isPending}>Parse</FormSubmit>
        )}
      </FormElementLine>
    </Form>
  )
}
export default ParseSongInput
