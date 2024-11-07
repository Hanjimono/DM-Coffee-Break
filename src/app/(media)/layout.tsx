// Components
import MainContentWrapper from "@/components/Containers/MainContentWrapper"

export default function MediaLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <MainContentWrapper>{children}</MainContentWrapper>
}
