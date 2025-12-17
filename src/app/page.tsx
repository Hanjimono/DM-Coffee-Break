// Components
import LoadingScreen from "@/components/Containers/LoadingScreen"
// Ui
import WallDecorated from "@/ui/Layout/Decorators/WallDecorated"

export default function MainPage() {
  return (
    <WallDecorated>
      <LoadingScreen loaded={true} />
      111
    </WallDecorated>
  )
}
