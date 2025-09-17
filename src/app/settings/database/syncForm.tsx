"use client"
// system
import { useEffect, useState } from "react"
import { useStore } from "@/store"
import { useRouter } from "next/navigation"
// components
import SettingHeader from "@/components/Settings/SettingsHeader"
import {
  useDatabase,
  useFunctionWithLoadingAndToast,
  useUpdateSettings
} from "@/components/Helpers/Hooks"
import { CURRENT_DATABASE_VERSION } from "@/components/Containers/Protectors/DatabaseProtectedComponent"
// ui
import Room, { HiddenRoom } from "@/ui/Layout/Room"
import Stack from "@/ui/Layout/Stack"
import Note from "@/ui/Presentation/Note"
import Text from "@/ui/Presentation/Text"
import Button from "@/ui/Actions/Button"
import Input from "@/ui/Form/Input"

export default function DatabaseSyncForm() {
  const { getVersion, sync } = useDatabase()
  const updateSettings = useUpdateSettings()
  const [version, setVersion] = useState("0.0.0")
  const confirm = useStore((state) => state.confirm)
  const router = useRouter()

  // Fetch the current database version when the component mounts
  useEffect(() => {
    const getCurrentVersion = async () => {
      const version = await getVersion()
      setVersion(version)
    }
    getCurrentVersion()
  }, [getVersion])

  /**
   * Handles the database synchronization process.
   */
  const handleSync = async () => {
    const resultVersion = await sync(CURRENT_DATABASE_VERSION)
    if (resultVersion !== CURRENT_DATABASE_VERSION) {
      return false
    }
    updateSettings()
    setVersion(resultVersion)
    router.push("/settings/global/database")
    return true
  }

  // Wrap the handleSync function to manage loading state and show success/error toasts
  const [wrappedHandleSync, isLoading] = useFunctionWithLoadingAndToast(
    handleSync,
    "Database updated successfully",
    "Database update failed"
  )

  const handleSyncButtonClick = () => {
    confirm(
      "Are you sure you want to update the database? Changes are irreversible.",
      { onConfirm: wrappedHandleSync }
    )
  }
  const wrongVersion = version !== CURRENT_DATABASE_VERSION
  const loading = false
  return (
    <>
      <Room className="mb-same-level">
        <Stack gap="same-level">
          <SettingHeader
            title="Database Settings"
            description="All main info stored in database. It's important to keep it up to date."
          />
          <Input
            label="Current database version"
            name="version"
            value={version}
            disabled
            error={
              wrongVersion ? "The database version is outdated" : undefined
            }
            loading={loading}
          />
        </Stack>
      </Room>
      <HiddenRoom isShown={!wrongVersion}>
        {!wrongVersion && (
          <Note type="success">The database is up to date.</Note>
        )}
      </HiddenRoom>
      <HiddenRoom isShown={wrongVersion}>
        <Stack gap="same-level-close">
          <Note type="warning">
            The database version is outdated. Please update the database.
          </Note>
          <Text>
            You can update database automatically. Click the button below. This
            action will update the database to the latest version.
          </Text>
          <Button icon="database" secondary onClick={handleSyncButtonClick}>
            Update Database
          </Button>
        </Stack>
      </HiddenRoom>
    </>
  )
}
