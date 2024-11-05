// components
import DatabaseSyncForm from "../../database/syncForm"
// ui
import WallDecorated from "@/ui/Layout/Decorators/WallDecorated"

export default function MainPage() {
  return (
    <WallDecorated>
      <DatabaseSyncForm />
    </WallDecorated>
  )
}
