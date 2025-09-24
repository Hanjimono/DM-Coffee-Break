// Components
import MainContentWrapper from "@/components/Containers/MainContentWrapper"
import SettingsBlock from "@/components/Settings/SettingsBlock"
import Wall from "@/ui/Layout/Wall"
import Title from "@/ui/Presentation/Title"
import ContentAppearTransition from "@/ui/Skeleton/Transition/ContentAppearTransition"

export default function SettingsLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <MainContentWrapper>
      <Wall className="overflow-hidden box-border" isShortYPadding>
        <Title className="mb-distant">Settings</Title>
        <SettingsBlock>
          <ContentAppearTransition animationVariant="simple">
            {children}
          </ContentAppearTransition>
        </SettingsBlock>
      </Wall>
    </MainContentWrapper>
  )
}
