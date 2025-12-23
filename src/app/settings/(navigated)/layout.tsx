// Components
import MainContentWrapper from "@/components/Containers/MainContentWrapper"
import Screen from "@/components/Layout/Screen"
import ScreenContent from "@/components/Layout/ScreenContent"
import ScreenHeader from "@/components/Layout/ScreenHeader"
import SettingsBlock from "@/components/Settings/SettingsBlock"
// ui
import Wall from "@/ui/Layout/Wall"
import ContentAppearTransition from "@/ui/Skeleton/Transition/ContentAppearTransition"

export default function SettingsLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <MainContentWrapper>
      <Wall className="overflow-hidden box-border" isShortYPadding>
        <Screen>
          <ScreenHeader title="Settings" />
          <ScreenContent>
            <SettingsBlock>
              <ContentAppearTransition
                className="h-full"
                animationVariant="simple"
              >
                {children}
              </ContentAppearTransition>
            </SettingsBlock>
          </ScreenContent>
        </Screen>
      </Wall>
    </MainContentWrapper>
  )
}
