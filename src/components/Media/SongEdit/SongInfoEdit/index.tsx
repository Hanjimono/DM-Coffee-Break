"use client"
// system
import { z } from "zod"
// components
import TagEditor from "@/components/Helpers/TagEditor"
import { useLocalTags } from "@/components/Helpers/TagEditor/hooks"
// ui
import Form from "@/ui/Form/Form"
import Input from "@/ui/Form/Input"
import FormSubmit from "@/ui/Form/FormSubmit"
import { formatClassnames } from "@/ui/Skeleton/utils"
import FormElementWrapper, {
  FormElementLine,
  FormElementNestedWrapper
} from "@/ui/Form/FormElementWrapper"
import Button from "@/ui/Actions/Button"
import Dictionary from "@/components/Helpers/Dictionary"
import Inline from "@/ui/Layout/Inline"
import Stack from "@/ui/Layout/Stack"
import SmartImage from "@/ui/Presentation/SmartImage"
// types
import { SongInfoEditProps } from "./types"

// Zod validation schema
const songInfoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  artist: z.string(),
  comment: z.string(),
  tags: z.array(z.number()),
  categoryId: z.number().nullable()
})

/**
 * Renders a form for editing song information.
 * It includes fields for title, artist, comment, category, and tags.
 * It also includes a button to change the song URL.
 *
 * @param songInfo - Existing song info for edit mode
 * @param onSave - Callback function to handle song info save
 * @param onChangeLink - Callback function to handle song URL change
 * @returns
 */
function SongInfoEdit({ songInfo, onSave, onChangeLink }: SongInfoEditProps) {
  const classNames = formatClassnames("song-info-edit")

  // Use local tags hook for tag management
  const [tags, handleSelectTag, handleDeselectTag] = useLocalTags(
    songInfo?.tags || []
  )

  // Default values for the form
  const defaultValues: z.infer<typeof songInfoSchema> = {
    title: songInfo?.title || "",
    artist: songInfo?.artist || "",
    comment: songInfo?.comment || "",
    tags: songInfo?.tags || [],
    categoryId: songInfo?.categoryId || null
  }

  // Handle form submission
  const handleSubmit = (data: z.infer<typeof songInfoSchema>) => {
    if (onSave && songInfo) {
      onSave({
        ...songInfo,
        ...data,
        tags: tags,
        categoryId: data.categoryId || undefined
      })
    }
  }

  return (
    <div className={classNames}>
      <Form
        validationSchema={songInfoSchema}
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        gap="same-level"
      >
        <FormElementNestedWrapper>
          <Inline className="w-full" gap="same-level">
            <Stack className="grow" gap="same-level">
              <FormElementWrapper>
                <Input name="title" label="Title" placeholder="Song title" />
              </FormElementWrapper>

              <FormElementWrapper>
                <Input name="artist" label="Artist" placeholder="Artist name" />
              </FormElementWrapper>
            </Stack>
            <div className="w-24 h-24 object-cover">
              <SmartImage
                src={songInfo?.thumbnail || ""}
                alt="Song thumbnail"
                width={100}
                height={100}
              />
            </div>
          </Inline>
        </FormElementNestedWrapper>

        <FormElementLine>
          <Dictionary
            dictionary="mediaCategory"
            name="categoryId"
            label="Category"
          />

          <Input name="comment" label="Comment" placeholder="Add a comment" />
        </FormElementLine>

        <TagEditor
          selectedTagIds={tags}
          onSelectTag={handleSelectTag}
          onDeselectTag={handleDeselectTag}
        />

        <FormElementLine>
          <FormSubmit>Save Song</FormSubmit>
          <Button onClick={onChangeLink} transparent>
            Change song URL
          </Button>
        </FormElementLine>
      </Form>
    </div>
  )
}

export default SongInfoEdit
