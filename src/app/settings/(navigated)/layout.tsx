// Components
import MainContentWrapper from "@/components/Containers/MainContentWrapper"
import SettingsMenu from "@/components/Navigation/SettingsMenu"
// Ui
import Beam from "@/ui/Layout/Beam"

export default function SettingsLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <MainContentWrapper>
      <Beam withoutWrap whole withoutGap>
        <SettingsMenu />
        <div className="pl-44 w-full">{children}</div>
      </Beam>
    </MainContentWrapper>
  )
}
