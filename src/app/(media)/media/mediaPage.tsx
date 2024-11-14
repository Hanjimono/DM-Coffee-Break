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
        <Title size={5} bottomGap="close">
          Media Library
        </Title>
        <Beam>
          <Button icon="folder" onClick={() => openModal("categoryEdit")}>
            Add category
          </Button>
          <Button icon="add" link="/media/new">
            Add Song
          </Button>
        </Beam>
      </Room>
      <Library />
    </WallDecorated>
  )
}
