// components
import MusicPlayerProtectedComponent from "@/components/Containers/Protectors/MusicPlayerProtectedComponent"
import MediaPlayerSettingsContent from "./mediaPlayerSettings"
// ui
import WallDecorated from "@/ui/Layout/Decorators/WallDecorated"

export default function MediaPlayerSettings() {
  return (
    <MusicPlayerProtectedComponent>
      <WallDecorated>
        <MediaPlayerSettingsContent />
      </WallDecorated>
    </MusicPlayerProtectedComponent>
  )
}
