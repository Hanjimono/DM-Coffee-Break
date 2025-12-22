// components
import MusicPlayerProtectedComponent from "@/components/Containers/Protectors/MusicPlayerProtectedComponent"
import MediaPlayerSettings from "@/components/Settings/SettingsForm/MediaPlayer"

export default function MediaPlayerSettingsPage() {
  return (
    <MusicPlayerProtectedComponent>
      <MediaPlayerSettings />
    </MusicPlayerProtectedComponent>
  )
}
