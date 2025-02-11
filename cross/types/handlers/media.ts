import { MediaCategory } from "@cross/types/media/category"
import { SongInfo } from "../database/media"

/**
 * Interface for handling media-related operations.
 */
export interface MediaHandler {
  /**
   * Saves a media category. Can create a new category or update an existing one.
   * @param data - The media category data to save.
   * @returns A promise that resolves to a boolean indicating whether the save operation was successful.
   */
  saveCategory: (data: MediaCategory) => Promise<boolean>

  /**
   * Deletes a media category by its ID.
   * @param id - The ID of the media category to delete.
   * @returns A promise that resolves to a boolean indicating whether the delete operation was successful.
   */
  deleteCategory: (id: number) => Promise<boolean>

  /**
   * Retrieves all media categories.
   * @returns A promise that resolves to an array of media categories.
   */
  getCategories: () => Promise<MediaCategory[]>

  /**
   * Retrieves a song by its ID.
   * @param id - song ID
   * @returns
   */
  getSong: (id: number) => Promise<SongInfo | undefined>

  /**
   * Edits a song's information.
   * @param song - The song information to edit.
   * @returns A promise that resolves to a boolean indicating whether the edit operation was successful.
   */
  editSong: (song: SongInfo) => Promise<boolean>

  /**
   * Deletes a song by its ID.
   * @param id - The ID of the song to delete.
   * @returns A promise that resolves to a boolean indicating whether the delete operation was successful.
   */
  deleteSong: (id: number) => Promise<boolean>

  /**
   * Retrieves all songs in a specific category.
   * @param categoryId - The ID of the category to retrieve songs from.
   * @returns A promise that resolves to an array of song information.
   */
  getSongs: (categoryId: number) => Promise<SongInfo[]>

  /**
   * Retrieves all unassigned songs.
   * @returns A promise that resolves to an array of unassigned song information.
   */
  getUnassignedSongs: () => Promise<SongInfo[]>
}
