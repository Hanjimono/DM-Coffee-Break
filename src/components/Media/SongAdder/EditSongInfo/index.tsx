// System
import { cx } from "class-variance-authority"
import { twMerge } from "tailwind-merge"
// ui
import Form from "@/ui/Form/Form"
import Input from "@/ui/Form/Input"
import Text from "@/ui/Presentation/Text"
// Styles and types
import { EditSongInfoProps } from "./types"
import Beam from "@/ui/Layout/Beam"
import FormSubmit from "@/ui/Form/FormSubmit"
import Button from "@/ui/Actions/Button"
import Pillar from "@/ui/Layout/Pillar"
import SongCard from "../../SongCard"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import Dictionary from "@/components/Helpers/Dictionary"
import { useState } from "react"
import TagEditor from "@/components/Helpers/TagEditor"
import { useLocalTags } from "@/components/Helpers/TagEditor/hooks"

const formValues = {
  title: yup.string().required("Title is required"),
  artist: yup.string(),
  comment: yup.string()
}

function EditSongInfo({
  className,
  cancelLink,
  handleCancelClick,
  defaultValues
}: EditSongInfoProps) {
  const calculatedClassNames = twMerge(cx("edit-song-info", className))
  const [tags, handleSelectTag, handleDeselectTag] = useLocalTags(
    defaultValues?.tags
  )
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(yup.object(formValues).shape({})) as any,
    defaultValues: defaultValues
  })
  const currentValues = methods.watch()
  return (
    <Beam>
      <Pillar sm={7}>
        <Form className={calculatedClassNames} methods={methods}>
          <Input label="Title" name="title" />
          <Input label="Artist" name="artist" />
          <Dictionary
            dictionary="mediaCategories"
            name="categoryId"
            label="Category"
          />
          <TagEditor
            selectedTagIds={tags}
            onSelectTag={handleSelectTag}
            onDeselectTag={handleDeselectTag}
          />
          <Text italic>
            You can add your own short comment about this song to easily find it
            later. Like &quot;Funny tavern song&quot; or &quot;Epic boss
            battle&quot;.
          </Text>
          <Input label="Comment" name="comment" />
          <Beam contentJustify="end">
            <FormSubmit success>Save</FormSubmit>
            <Button link={cancelLink} onClick={handleCancelClick} cancel>
              Cancel
            </Button>
          </Beam>
        </Form>
      </Pillar>
      <Pillar sm={5}>
        <Beam className="" bottomGap="same-level">
          <SongCard
            type="short"
            info={{ ...currentValues, thumbnail: defaultValues?.thumbnail }}
            isEdit
          />
        </Beam>
        <Beam className="px-10">
          <SongCard
            type="full"
            info={{ ...currentValues, thumbnail: defaultValues?.thumbnail }}
            isEdit
          />
        </Beam>
      </Pillar>
    </Beam>
  )
}
export default EditSongInfo
