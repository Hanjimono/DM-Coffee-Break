// components
import Screen from "@/components/Layout/Screen"
import ScreenHeader from "@/components/Layout/ScreenHeader"
import LibraryControlPanel from "@/components/Media/LibraryControlPanel"
import ScreenContent from "@/components/Layout/ScreenContent"
import Library from "@/components/Media/Library"
// ui
import WallDecorated from "@/ui/Layout/Decorators/WallDecorated"

export default function MediaPageContent() {
  return (
    <WallDecorated>
      <Screen>
        <ScreenHeader title="Media Library" />
        <LibraryControlPanel />
        <ScreenContent />
      </Screen>
    </WallDecorated>
  )
}
