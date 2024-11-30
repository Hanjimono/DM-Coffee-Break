import { TagLineProps, TagElement } from "@/ui/Actions/TagLine/types"

export interface TagEditorProps<Tag extends TagElement>
  extends Omit<TagLineProps<Tag>, "allAvailableTagList" | "onCreateTag"> {}
