// Components
import MainContentWrapper from "@/components/Containers/MainContentWrapper"

export default function HomeLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <MainContentWrapper>{children}</MainContentWrapper>
}
