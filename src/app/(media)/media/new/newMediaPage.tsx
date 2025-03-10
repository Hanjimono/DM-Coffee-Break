// Components
import MusicPlayerProtectedComponent from "@/components/Containers/Protectors/MusicPlayerProtectedComponent"
import SongAdder from "@/components/Media/SongAdder"
// Ui
import WallDecorated from "@/ui/Layout/Decorators/WallDecorated"

export default function MewMediaPageContent() {
  return (
    <MusicPlayerProtectedComponent>
      <WallDecorated>
        <SongAdder />
      </WallDecorated>
    </MusicPlayerProtectedComponent>
  )
}
