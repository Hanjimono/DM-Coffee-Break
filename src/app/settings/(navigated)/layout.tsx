// Components
import MainContentWrapper from "@/components/Containers/MainContentWrapper"

export default function SettingsLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <MainContentWrapper>{children}</MainContentWrapper>
}
