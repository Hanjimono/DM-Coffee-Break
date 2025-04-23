"use client"
// components
import Library from "@/components/Media/Library"
// ui
import WallDecorated from "@/ui/Layout/Decorators/WallDecorated"
import Room from "@/ui/Layout/Room"
import Title from "@/ui/Presentation/Title"
import Beam from "@/ui/Layout/Beam"
import Button from "@/ui/Actions/Button"
import { useStore } from "@/store"

export default function MediaPageContent() {
  const openModal = useStore((state) => state.openModal)
  return (
    <WallDecorated>
      <Room noGap>
        <Title size={3} bottomGap="close">
          Media Library
        </Title>
        <Beam contentJustify="center">
          <Button className="text-text" icon="add" link="/media/new" text>
            Add Song
          </Button>
          <Button
            className="text-text"
            icon="folder"
            onClick={() => openModal("categoryEdit")}
            text
          >
            Add category
          </Button>
        </Beam>
      </Room>
      <Library />
    </WallDecorated>
  )
}
