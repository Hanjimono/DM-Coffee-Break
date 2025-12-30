// components
import Screen from "@/components/Layout/Screen"
import ScreenHeader from "@/components/Layout/ScreenHeader"
import SongEdit from "@/components/Media/SongEdit"
import ScreenContent from "@/components/Layout/ScreenContent"
// ui
import WallDecorated from "@/ui/Layout/Decorators/WallDecorated"

export default function NewSongParsePageContent() {
  return (
    <WallDecorated>
      <Screen>
        <ScreenHeader title="Parse Song From Web" />
        <ScreenContent>
          <SongEdit isParseMode={true} />
        </ScreenContent>
      </Screen>
    </WallDecorated>
  )
}
