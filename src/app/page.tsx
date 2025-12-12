"use client"
import { useCIpc } from "@/components/Containers/CIpcProvider"
// Components
import LoadingScreen from "@/components/Containers/LoadingScreen"
// Ui
import WallDecorated from "@/ui/Layout/Decorators/WallDecorated"

export default function MainPage() {
  const cIpc = useCIpc()
  const { data, isPending } = cIpc.database.settings.get()
  console.log("🚀 --------------------------🚀")
  console.log("🚀 ~ MainPage ~ data:", data)
  console.log("🚀 --------------------------🚀")
  console.log("🚀 ------------------------------------🚀")
  console.log("🚀 ~ MainPage ~ isPending:", isPending)
  console.log("🚀 ------------------------------------🚀")
  return (
    <WallDecorated>
      <LoadingScreen loaded={false} />
    </WallDecorated>
  )
}
