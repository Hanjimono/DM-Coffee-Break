// System
import clsx from "clsx"
// ui
import Form from "@/ui/Form/Form"
import Input from "@/ui/Form/Input"
import Text from "@/ui/Presentation/Text"
// Styles and types
import { EditSongInfoProps } from "./types"
import styles from "./styles.module.scss"
import Beam from "@/ui/Layout/Beam"
import FormSubmit from "@/ui/Form/FormSubmit"
import Button from "@/ui/Actions/Button"

function EditSongInfo({
  className,
  cancelLink,
  handleCancelClick
}: EditSongInfoProps) {
  const calculatedClassNames = clsx(styles["edit-song-info"], className)
  return (
    <Form className={calculatedClassNames}>
      <Input label="Name" name="name" />
      <Input label="Artist" name="artist" />
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
  )
}
export default EditSongInfo
