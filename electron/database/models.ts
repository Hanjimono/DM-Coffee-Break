import { Prisma } from "@db/generated/prisma/client"

export type Settings = Prisma.settingsGetPayload<{}>
export type MediaCategory = Prisma.mediaCategoryGetPayload<{}>
export type Song = Prisma.songGetPayload<{}>
const songWithTags = {
  include: { tags: true }
} satisfies Prisma.songDefaultArgs
export type SongWithTags = Prisma.songGetPayload<typeof songWithTags>
export type Tag = Prisma.tagGetPayload<{}>
