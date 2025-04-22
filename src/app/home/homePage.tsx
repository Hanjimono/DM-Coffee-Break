//Components
import LinkBlock from "@/components/Navigation/LinkBlock"
//Ui
import WallDecorated from "@/ui/Layout/Decorators/WallDecorated"
import Beam from "@/ui/Layout/Beam"
import Title from "@/ui/Presentation/Title"

export default function HomePageContent() {
  return (
    <WallDecorated>
      <Beam
        whole
        contentJustify="center"
        contentAlign="center"
        bottomGap="same"
        withoutGap
        className="flex-col"
      >
        <Title bottomGap="other-level-large">
          Every Tale Needs an Epic Soundtrack
        </Title>
        <Beam contentJustify="center" contentAlign="center">
          <LinkBlock
            title="Media library"
            href="/media"
            image="/public/images/media_cover.png"
            description="List of all your music"
            big
          />
          <LinkBlock
            title="Games"
            href="/games"
            image="/public/images/games_cover.png"
            description="Prepare games for future"
            big
          />
        </Beam>
      </Beam>
    </WallDecorated>
  )
}
