import LoadingScreen from "@/components/Containers/LoadingScreen"
import WallDecorated from "@/ui/Layout/Decorators/WallDecorated"

export default function MainPage() {
  return (
    <WallDecorated>
      <LoadingScreen loaded={false} />
    </WallDecorated>
  )
}
