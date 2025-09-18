//Components
import LinkBlock from "@/components/Navigation/LinkBlock"
//Ui
import WallDecorated from "@/ui/Layout/Decorators/WallDecorated"
import Title from "@/ui/Presentation/Title"
import Stack from "@/ui/Layout/Stack"
import Inline from "@/ui/Layout/Inline"
import ImageButton from "@/ui/Actions/ImageButton"

export default function HomePageContent() {
  return (
    <WallDecorated>
      <Stack gap="none" className="justify-center items-center h-full">
        <Title className="mb-14">Every Tale Needs an Epic Soundtrack</Title>
        <Inline>
          <ImageButton
            className="rounded-3xl"
            width={275}
            height={293}
            title="Media Library"
            alt="Media Library"
            link="/media"
            src="/images/media_cover.png"
            description="List of all your music"
            isWithoutSaturationChange
            isWithoutTextBackground
          />
          <ImageButton
            className="rounded-none"
            width={275}
            height={293}
            title="Games"
            alt="Games"
            link="/games"
            src="/images/games_cover.png"
            description="Prepare games for future"
            isWithoutSaturationChange
            isWithoutTextBackground
          />
        </Inline>
      </Stack>
    </WallDecorated>
  )
}

// <LinkBlock
//   className="w-[275px] h-[293px]"
//   title="Media library"
//   href="/media"
//   image="/public/images/media_cover.png"
//   description="List of all your music"
//   big
// />
// <LinkBlock
//   className="w-[275px] h-[293px]"
//   title="Games"
//   href="/games"
//   image="/public/images/games_cover.png"
//   description="Prepare games for future"
//   big
// />
