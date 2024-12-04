"use client"
import LoadingScreen from "@/components/Containers/LoadingScreen"
import { useDatabase } from "@/components/Helpers/Hooks"
import { SongInfo } from "@cross/types/database/media"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import EditSongInfo from "@/components/Media/SongAdder/EditSong/EditSongInfo"

export default function EditSongWrapper({ id }: { id: number }) {
  const [loading, setLoading] = useState(false)
  const [song, setSong] = useState<SongInfo | undefined>(undefined)
  const database = useDatabase()
  const router = useRouter()
  const returnToMedia = useCallback(() => {
    router.push("/media")
  }, [router])
  useEffect(() => {
    const fetchSong = async () => {
      setLoading(true)
      const songInfo = await database.media.getSong(id)
      setSong(songInfo)
      if (!songInfo) {
        returnToMedia()
      }
      setLoading(false)
    }
    if (id && database) {
      fetchSong()
    }
  }, [database, setSong, id, router, returnToMedia])
  if (song) {
    return (
      <EditSongInfo defaultValues={song} handleCancelClick={returnToMedia} />
    )
  }
  if (loading) {
    return <LoadingScreen loaded={!loading} />
  }
}
