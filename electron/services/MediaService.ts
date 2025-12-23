// services
import { BaseService } from "./BaseService"
// db
import { Song, SongWithTags } from "@db/models"
// repositories
import { MediaCategoryRepository } from "../repositories/MediaCategoryRepository"
import { SongRepository } from "../repositories/SongRepository"
// constants
import {
  MEDIA_CATEGORY_DEFAULT_SONGS_COUNT,
  UNSORTED_CATEGORY
} from "@cross/constants/media"
// types
import {
  MediaCategoryWithSongsInfo,
  SaveMediaCategoryDTO
} from "@cross/types/media/category"
import { ShortSongInfo, SongInfo } from "@cross/types/database/media"
import { AvailableMediaSources } from "@cross/types/media/song"

/**
 * Service class for managing media categories and songs.
 */
export class MediaService extends BaseService {
  constructor(
    private mediaCategoryRepository: MediaCategoryRepository,
    private songRepository: SongRepository
  ) {
    super()
  }

  /**
   * Formats a Song object into a ShortSongInfo object.
   * @param song - The Song object to format.
   * @returns A ShortSongInfo object.
   */
  private formatShortSongInfo(song: Song): ShortSongInfo {
    return {
      id: song.id,
      title: song.title,
      artist: song.artist || undefined,
      thumbnail: song.thumbnail || undefined
    }
  }

  /**
   * Formats a SongWithTags object into a SongInfo object.
   * @param song - The SongWithTags object to format.
   * @returns A SongInfo object.
   */
  private formatSongInfo(song: SongWithTags): SongInfo {
    return {
      id: song.id,
      title: song.title,
      artist: song.artist || undefined,
      thumbnail: song.thumbnail || undefined,
      categoryId: song.categoryId || undefined,
      comment: song.comment || undefined,
      duration: song.duration || undefined,
      url: song.url,
      source: song.source as AvailableMediaSources,
      tags: song.tags ? song.tags.map((tag) => tag.id) : undefined
    }
  }

  @BaseService.logErrors([])
  /**
   * Retrieves media categories along with their associated songs information.
   * @returns A promise that resolves to an array of media categories with songs info.
   */
  async getCategoriesWithSongsInfo(): Promise<MediaCategoryWithSongsInfo[]> {
    let resultedCategories: MediaCategoryWithSongsInfo[] = []
    // First we need to collect songs for each category
    const categories =
      await this.mediaCategoryRepository.getAllMediaCategories()
    for (const category of categories) {
      const songs = await this.songRepository.getLimitedSongsByCategoryId(
        category.id!,
        MEDIA_CATEGORY_DEFAULT_SONGS_COUNT
      )
      const formattedSongs: ShortSongInfo[] = []
      for (const song of songs) {
        formattedSongs.push(this.formatShortSongInfo(song))
      }
      const songsCount = await this.songRepository.getSongCountByCategoryId(
        category.id
      )
      resultedCategories.push({
        id: category.id,
        title: category.title,
        hex: category.hex || undefined,
        songsCount,
        songs: formattedSongs
      })
    }
    // Now we need to check songs without category and add them to the result if any
    const unsortedSongs = await this.songRepository.getLimitedSongsByCategoryId(
      null,
      MEDIA_CATEGORY_DEFAULT_SONGS_COUNT
    )
    const formattedUnsortedSongs: ShortSongInfo[] = []
    for (const song of unsortedSongs) {
      formattedUnsortedSongs.push(this.formatShortSongInfo(song))
    }
    resultedCategories.push({
      ...UNSORTED_CATEGORY,
      songsCount: await this.songRepository.getSongCountByCategoryId(null),
      songs: formattedUnsortedSongs
    })
    return resultedCategories
  }

  @BaseService.logErrorsWithCustomMessage("Failed to save category")
  /**
   * Saves a media category. Can create a new category or update an existing one.
   * @param data - The media category data to save.
   * @returns A promise that resolves to a boolean indicating whether the save operation was successful.
   */
  async saveCategory(data: SaveMediaCategoryDTO): Promise<boolean> {
    const result = await this.mediaCategoryRepository.saveMediaCategory(data)
    return result.id ? true : false
  }

  @BaseService.logErrorsWithCustomMessage("Failed to delete category")
  /**
   * Deletes a media category by its ID.
   * @param id - The ID of the media category to delete.
   * @returns A promise that resolves to a boolean indicating whether the delete operation was successful.
   */
  async deleteCategory(id: number): Promise<boolean> {
    return this.mediaCategoryRepository.deleteMediaCategoryById(id)
  }

  @BaseService.logErrors(false)
  /**
   * Creates or edits a song.
   * @param songData - The song information to save.
   * @returns A promise that resolves to a boolean indicating whether the save operation was successful.
   */
  async saveSong(songData: SongInfo): Promise<boolean> {
    const song = await this.songRepository.saveSong(songData)
    return song ? true : false
  }

  @BaseService.logErrors(false)
  /**
   * Deletes a song by its ID.
   * @param id - The ID of the song to delete.
   * @returns A promise that resolves to a boolean indicating whether the delete operation was successful.
   */
  async deleteSong(id: number): Promise<boolean> {
    return this.songRepository.deleteSongById(id)
  }

  @BaseService.logErrors([])
  /**
   * Retrieves all songs in a specific category including their tags.
   * @param categoryId - The ID of the category to filter songs by.
   * @returns A promise that resolves to an array of SongInfo objects.
   */
  async getSongsByCategoryId(categoryId: number | null): Promise<SongInfo[]> {
    const songs = await this.songRepository.getSongsByCategoryId(categoryId)
    const formattedSongs: SongInfo[] = []
    for (const song of songs) {
      formattedSongs.push(this.formatSongInfo(song))
    }
    return formattedSongs
  }

  @BaseService.logErrors(undefined)
  /**
   * Retrieves a song by its ID.
   * @param id - song ID
   * @returns A promise that resolves to a SongInfo object or undefined if not found.
   */
  async getSongById(id: number): Promise<SongInfo | undefined> {
    const song = await this.songRepository.getSongById(id)
    if (!song) return undefined
    return this.formatSongInfo(song)
  }
}
