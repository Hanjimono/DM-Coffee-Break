// Components
import MainContentWrapper from "@/components/Containers/MainContentWrapper"

export default function DatabaseSettingsLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <MainContentWrapper hideMenu>{children}</MainContentWrapper>
}
