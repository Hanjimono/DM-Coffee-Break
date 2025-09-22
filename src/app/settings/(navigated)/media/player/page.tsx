// components
import MusicPlayerProtectedComponent from "@/components/Containers/Protectors/MusicPlayerProtectedComponent"
import MediaPlayerSettingsContent from "./mediaPlayerSettings"

export default function MediaPlayerSettings() {
  return (
    <MusicPlayerProtectedComponent>
      <MediaPlayerSettingsContent />
    </MusicPlayerProtectedComponent>
  )
}
