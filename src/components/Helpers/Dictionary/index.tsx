// System
import { FieldValues } from "react-hook-form"
import { useEffect, useState } from "react"
// Components
import { useDatabase } from "@/components/Helpers/Hooks"
// Ui
import Select from "@/ui/Form/Select"
// Styles and types
import { DictionaryProps } from "./types"
import { DefaultSelectOption } from "@/ui/Form/Select/types"

/**
 * A component that fetches and displays a dictionary from DB as select component.
 *
 * @param {string} props.dictionary - The name of the dictionary to fetch.
 */
function Dictionary<
  SelectOptionType extends DefaultSelectOption,
  Values extends FieldValues
>({ dictionary, ...rest }: DictionaryProps<SelectOptionType, Values>) {
  const [loading, setLoading] = useState(true)
  const [options, setOptions] = useState<SelectOptionType[]>([])
  const database = useDatabase()
  useEffect(() => {
    const fetchDictionary = async () => {
      const data = (await database.dictionary.get(
        dictionary
      )) as SelectOptionType[]
      setOptions(data)
      setLoading(false)
    }
    fetchDictionary()
  }, [database, dictionary])
  return <Select {...rest} options={options} loading={loading} />
}

export default Dictionary
