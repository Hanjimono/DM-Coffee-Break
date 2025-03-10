import MusicPlayerProtectedComponent from "@/components/Containers/Protectors/MusicPlayerProtectedComponent"
import EditSongWrapper from "@/components/Media/SongAdder/EditSong/EditSongWrapper"
import WallDecorated from "@/ui/Layout/Decorators/WallDecorated"

export default function EditMediaPageContent({ id }: { id: number }) {
  return (
    <MusicPlayerProtectedComponent>
      <WallDecorated>
        <EditSongWrapper id={id} />
      </WallDecorated>
    </MusicPlayerProtectedComponent>
  )
}
