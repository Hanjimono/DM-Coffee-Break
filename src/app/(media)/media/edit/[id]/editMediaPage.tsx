// utils
import { useCIpc } from "@/components/Containers/CIpcProvider/cIpcProviderContainer.client"
// Components
import Screen from "@/components/Layout/Screen"
import ScreenHeader from "@/components/Layout/ScreenHeader"
import SongEdit from "@/components/Media/SongEdit"
import ScreenContent from "@/components/Layout/ScreenContent"
import MusicPlayerProtectedComponent from "@/components/Containers/Protectors/MusicPlayerProtectedComponent"
import LoadingScreen from "@/components/Containers/LoadingScreen"
// ui
import WallDecorated from "@/ui/Layout/Decorators/WallDecorated"
// constants
import { MEDIA_SOURCES } from "@cross/constants/media"

export default function EditMediaPageContent({ id }: { id: number }) {
  const cIpc = useCIpc()
  const songInfo = cIpc.database.media.getSong({ id })
  return (
    <MusicPlayerProtectedComponent>
      <WallDecorated>
        <LoadingScreen loaded={!songInfo.isPending}>
          <Screen>
            <ScreenHeader title={songInfo.data?.title || "Edit Song"} />
            <ScreenContent>
              <SongEdit
                isParseMode={songInfo.data?.source !== MEDIA_SOURCES.PC}
              />
            </ScreenContent>
          </Screen>
        </LoadingScreen>
      </WallDecorated>
    </MusicPlayerProtectedComponent>
  )
}
