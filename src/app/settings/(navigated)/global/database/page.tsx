// components
import DatabaseSyncForm from "@/app/settings/database/syncForm"
// ui
import WallDecorated from "@/ui/Layout/Decorators/WallDecorated"

export default function DatabaseSettingsPage() {
  return (
    <WallDecorated>
      <DatabaseSyncForm />
    </WallDecorated>
  )
}
