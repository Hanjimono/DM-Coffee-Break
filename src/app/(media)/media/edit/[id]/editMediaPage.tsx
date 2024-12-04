import EditSongWrapper from "@/components/Media/SongAdder/EditSong/EditSongWrapper"
import WallDecorated from "@/ui/Layout/Decorators/WallDecorated"

export default function EditMediaPageContent({ id }: { id: number }) {
  console.log("🚀 ----------------------------------🚀")
  console.log("🚀 ~ EditMediaPageContent ~ id:", id)
  console.log("🚀 ----------------------------------🚀")
  return (
    <WallDecorated>
      <EditSongWrapper id={id} />
    </WallDecorated>
  )
}
