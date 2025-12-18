"use client"
// system
import { useStore } from "@/store"
import { useRouter } from "next/navigation"
// cIpc
import { useCIpc } from "@/components/Containers/CIpcProvider/cIpcProviderContainer.client"
// components
import SettingsHeader from "@/components/Settings/SettingsHeader"
import { CURRENT_DATABASE_VERSION } from "@/components/Containers/Protectors/DatabaseProtectedComponent"
// ui
import Room, { HiddenRoom } from "@/ui/Layout/Room"
import Stack from "@/ui/Layout/Stack"
import Note from "@/ds/Presentation/Note"
import Text from "@/ui/Presentation/Text"
import Button from "@/ui/Actions/Button"
import Input from "@/ui/Form/Input"

export default function DatabaseSyncForm() {
  const confirm = useStore((state) => state.confirm)
  const router = useRouter()
  const cIpc = useCIpc()
  const currentVersion = cIpc.database.getVersion()
  const sync = cIpc.database.sync({
    __options: {
      isShowSuccessSnack: true,
      successMessage: "Database updated successfully"
    }
  })

  /**
   * Handles the database synchronization process.
   */
  const handleSync = async () => {
    const syncResult = await sync.saveMutateAsync({
      lastVersion: CURRENT_DATABASE_VERSION
    })
    if (syncResult) {
      currentVersion.refetch()
      router.push("/settings/global/database")
    }
  }

  const handleSyncButtonClick = () => {
    confirm(
      "Are you sure you want to update the database? Changes are irreversible.",
      { onConfirm: handleSync }
    )
  }
  const wrongVersion =
    !currentVersion.isPending &&
    currentVersion.data !== CURRENT_DATABASE_VERSION
  return (
    <>
      <Room className="mb-distant">
        <Stack gap="same-level">
          <SettingsHeader
            title="Database Settings"
            description="All main info stored in database. It's important to keep it up to date."
          />
          <Input
            label="Current database version"
            name="version"
            value={currentVersion.data || "0.0.0"}
            disabled
            error={
              wrongVersion ? "The database version is outdated" : undefined
            }
            loading={currentVersion.isPending}
          />
        </Stack>
      </Room>
      <HiddenRoom isShown={!wrongVersion}>
        {!wrongVersion && <Note>The database is up to date.</Note>}
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
