// Components
import MainContentWrapper from "@/components/Containers/MainContentWrapper"

export default function DatabaseSettingsLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <MainContentWrapper hideMenu>
      <div className="pl-44 w-full">{children}</div>
    </MainContentWrapper>
  )
}
