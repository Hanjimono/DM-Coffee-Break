// db
import { prisma } from "@db/prisma"
import { Song, SongWithTags } from "@db/models"
// types
import { SongInfo } from "@cross/types/database/media"

/**
 * Repository class for managing songs in the database.
 */
export class SongRepository {
  /**
   * Retrieves a limited number of songs by their category ID.
   * @param categoryId - The ID of the category to filter songs by.
   * @param limit - The maximum number of songs to retrieve. Default is 5.
   * @returns A promise that resolves to an array of Song objects.
   */
  getLimitedSongsByCategoryId(
    categoryId: number | null,
    limit: number = 5
  ): Promise<Song[]> {
    return prisma.song.findMany({
      where: { categoryId },
      take: limit
    })
  }

  /**
   * Retrieves the count of songs by their category ID.
   * @param categoryId - The ID of the category to filter songs by.
   * @returns A promise that resolves to the count of songs.
   */
  getSongCountByCategoryId(categoryId: number | null): Promise<number> {
    return prisma.song.count({
      where: { categoryId }
    })
  }

  /**
   * Saves a song to the database including its tags in one transaction.
   * If the song has an ID, it updates the existing song; otherwise, it creates a new one.
   * @param songData - The song data to save.
   * @returns A promise that resolves to the saved Song object or undefined if not found.
   */
  async saveSong(songData: SongInfo): Promise<Song | undefined> {
    return prisma.$transaction(async (tx) => {
      let song = undefined
      if (songData.id) {
        song = await tx.song.update({
          where: { id: songData.id },
          data: {
            title: songData.title,
            artist: songData.artist || null,
            thumbnail: songData.thumbnail || null,
            categoryId: songData.categoryId || null,
            comment: songData.comment || null,
            duration: songData.duration || null,
            url: songData.url,
            source: songData.source
          }
        })
      } else {
        song = tx.song.create({
          data: {
            title: songData.title,
            artist: songData.artist || null,
            thumbnail: songData.thumbnail || null,
            categoryId: songData.categoryId || null,
            comment: songData.comment || null,
            duration: songData.duration || null,
            url: songData.url,
            source: songData.source
          }
        })
      }
      song = await tx.song.findUnique({
        where: { id: (await song).id },
        include: { tags: true }
      })
      if (!song) return undefined
      if (!songData.tags) return song
      const newTagIds = songData.tags || []
      const currentTagIds = song.tags.map((tag) => tag.id)
      const tagsToAdd = songData.tags.filter(
        (id) => !currentTagIds.includes(id)
      )
      const tagsToRemove = currentTagIds.filter((id) => !newTagIds.includes(id))
      await tx.song.update({
        where: { id: song.id },
        data: {
          tags: {
            connect: tagsToAdd.map((id) => ({ id })),
            disconnect: tagsToRemove.map((id) => ({ id }))
          }
        }
      })
      return song
    })
  }

  /**
   * Deletes a song by its ID.
   * @param id - The ID of the song to delete.
   * @returns A promise that resolves to a boolean indicating whether the delete operation was successful.
   */
  deleteSongById(id: number): Promise<boolean> {
    return prisma.song
      .delete({
        where: { id }
      })
      .then(() => true)
      .catch(() => false)
  }

  /**
   * Retrieves all songs in a specific category including their tags.
   * @param categoryId - The ID of the category to filter songs by.
   * @returns A promise that resolves to an array of SongWithTags objects.
   */
  getSongsByCategoryId(categoryId: number | null): Promise<SongWithTags[]> {
    return prisma.song.findMany({
      where: { categoryId },
      include: { tags: true }
    })
  }

  /**
   * Retrieves a song by its ID including its tags.
   * @param id - song ID
   * @returns A promise that resolves to a SongWithTags object or null if not found.
   */
  getSongById(id: number): Promise<SongWithTags | null> {
    return prisma.song.findUnique({
      where: { id },
      include: { tags: true }
    })
  }
}
