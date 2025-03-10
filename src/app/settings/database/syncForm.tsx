"use client"
// System
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
// Store
import { useStore } from "@/store"
// Constants
import { CURRENT_DATABASE_VERSION } from "@/components/Containers/Protectors/DatabaseProtectedComponent"
// Components
import { useDatabase, useUpdateSettings } from "@/components/Helpers/Hooks"
// Ui
import Room, { HiddenRoom } from "@/ui/Layout/Room"
import Input from "@/ui/Form/Input"
import Note from "@/ui/Presentation/Note"
import Beam from "@/ui/Layout/Beam"
import Button from "@/ui/Actions/Button"
import Text from "@/ui/Presentation/Text"
import Divider from "@/ui/Presentation/Divider"
import Title from "@/ui/Presentation/Title"

/**
 * DatabaseSyncForm component is responsible for displaying the current version of the database
 * and providing an interface to update the database to the latest version.
 *
 * This component:
 * - Fetches the current database version on mount and displays it.
 * - Shows a warning if the database version is outdated.
 * - Provides a button to update the database, which triggers a confirmation dialog.
 * - Displays success or error messages based on the result of the update operation.
 */
export default function DatabaseSyncForm() {
  const { getVersion, sync } = useDatabase()
  const updateSettings = useUpdateSettings()
  const [version, setVersion] = useState("0.0.0")
  const [loading, setLoading] = useState(false)
  const successSnack = useStore((state) => state.successSnack)
  const errorSnack = useStore((state) => state.errorSnack)
  const confirm = useStore((state) => state.confirm)
  const router = useRouter()
  useEffect(() => {
    const getCurrentVersion = async () => {
      const version = await getVersion()
      setVersion(version)
    }
    getCurrentVersion()
  }, [getVersion])
  const wrongVersion = version !== CURRENT_DATABASE_VERSION
  const handleSyncButtonClick = () => {
    const handleSync = async () => {
      setLoading(true)
      try {
        const resultVersion = await sync(CURRENT_DATABASE_VERSION)
        if (resultVersion !== CURRENT_DATABASE_VERSION) {
          return errorSnack("Database update failed")
        }
        successSnack("Database updated successfully")
        setVersion(resultVersion)
        updateSettings()
        setLoading(false)
        router.push("/settings/global/database")
      } catch (error) {
        errorSnack("Database update failed")
      } finally {
        setLoading(false)
      }
    }
    confirm(
      "Are you sure you want to update the database? Changes are irreversible.",
      { onConfirm: handleSync }
    )
  }
  return (
    <>
      <Room bottomGap="same-level">
        <Title bottomGap="same">Database Settings</Title>
        <Divider bottomGap="close" />
        <Text>
          All main info stored in database. It&apos;s important to keep it up to
          date.
        </Text>
        <Input
          label="Current database version"
          name="version"
          value={version}
          disabled
          error={wrongVersion ? "The database version is outdated" : undefined}
          loading={loading}
        />
      </Room>
      <HiddenRoom isShown={!wrongVersion}>
        {!wrongVersion && (
          <Note type="success" bottomGap="same">
            The database is up to date.
          </Note>
        )}
      </HiddenRoom>
      <HiddenRoom isShown={wrongVersion}>
        <Note type="warning" bottomGap="same">
          The database version is outdated. Please update the database.
        </Note>
        <Text>
          You can update database automatically. Click the button below. This
          action will update the database to the latest version.
        </Text>
        <Beam contentJustify="end" whole>
          <Button icon="database" success onClick={handleSyncButtonClick}>
            Update Database
          </Button>
        </Beam>
      </HiddenRoom>
    </>
  )
}
