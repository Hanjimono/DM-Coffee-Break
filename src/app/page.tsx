"use client"
import { useCIpc } from "@/components/Containers/CIpcProvider"
// Components
import LoadingScreen from "@/components/Containers/LoadingScreen"
// Ui
import WallDecorated from "@/ui/Layout/Decorators/WallDecorated"

export default function MainPage() {
  const cIpc = useCIpc()
  const { data, isPending, error } = cIpc.database.settings.get()
  return (
    <WallDecorated>
      <LoadingScreen loaded={false} />
    </WallDecorated>
  )
}
