// System
import { FieldValues } from "react-hook-form"
// utils
import { useCIpc } from "@/components/Containers/CIpcProvider/cIpcProviderContainer.client"
// Ui
import Select from "@/ui/Form/Select"
import { DefaultSelectOption } from "@/ui/Form/Select/types"
// Styles and types
import { DictionaryProps } from "./types"

/**
 * A component that fetches and displays a dictionary from DB as select component.
 *
 * @param {string} props.dictionary - The name of the dictionary to fetch.
 */
function Dictionary<
  SelectOptionType extends DefaultSelectOption,
  Values extends FieldValues
>({ dictionary, ...rest }: DictionaryProps<SelectOptionType, Values>) {
  const cIpc = useCIpc()
  const getDictionary = cIpc.database.dictionary.get({
    dictionaryType: dictionary
  })
  return (
    <Select
      {...rest}
      options={getDictionary.data || []}
      loading={getDictionary.isPending}
    />
  )
}

export default Dictionary
