import { DefaultSelectOption, SelectProps } from "@/ui/Form/Select/types"
import { AvailableDictionaries } from "@cross/types/dictionary"
import { FieldValues } from "react-hook-form"

/** A component that fetches and displays a dictionary from DB as select component. */
export interface DictionaryProps<
  SelectOptionType extends DefaultSelectOption,
  Values extends FieldValues
> extends Omit<SelectProps<SelectOptionType, Values>, "options"> {
  /** The name of the dictionary to fetch. */
  dictionary: AvailableDictionaries
}
