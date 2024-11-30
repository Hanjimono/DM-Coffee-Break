// Components
import {
  SettingsContext,
  useCreateSettingsContext
} from "@/components/Helpers/Hooks"

/**
 * SettingsProvider component that provides settings context to its children.
 *
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The child components that will have access to the settings context.
 *
 * @returns {JSX.Element} The SettingsContext.Provider component wrapping the children.
 */
export default function SettingsProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [settings, updateSettings] = useCreateSettingsContext()
  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}
