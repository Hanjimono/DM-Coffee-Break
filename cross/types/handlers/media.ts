import {
  MediaCategoryWithSongsInfo,
  SaveMediaCategoryDTO
} from "@cross/types/media/category"
import { SongInfo } from "../database/media"
import { RendererHandler } from "./main"

/** Data transfer object for deleting a media category. */
interface DeleteCategoryDTO {
  /** The ID of the media category to delete. */
  id: number
}

/** Data transfer object for retrieving a song by ID. */
interface GetSongDTO {
  /** The ID of the song to retrieve. */
  id: number
}

/** Data transfer object for editing a song. */
interface EditSongDTO extends SongInfo {}

/** Data transfer object for deleting a song by ID. */
interface DeleteSongDTO {
  /** The ID of the song to delete. */
  id: number
}

/** Data transfer object for retrieving songs by category ID. */
interface GetSongsDTO {
  /** The ID of the category to retrieve songs from. */
  categoryId: number
}

/**
 * Interface for handling media-related operations.
 */
export interface MediaHandler {
  /**
   * Saves a media category. Can create a new category or update an existing one.
   * @returns A promise that resolves to a boolean indicating whether the save operation was successful.
   */
  saveCategory: RendererHandler<(arg: SaveMediaCategoryDTO) => Promise<boolean>>

  /**
   * Deletes a media category by its ID.
   * @returns A promise that resolves to a boolean indicating whether the delete operation was successful.
   */
  deleteCategory: RendererHandler<(arg: DeleteCategoryDTO) => Promise<boolean>>

  /**
   * Retrieves all media categories.
   * @returns A promise that resolves to an array of media categories.
   */
  getCategories: RendererHandler<() => Promise<MediaCategoryWithSongsInfo[]>>

  /**
   * Retrieves a song by its ID.
   * @returns
   */
  getSong: RendererHandler<(arg: GetSongDTO) => Promise<SongInfo | undefined>>

  /**
   * Edits a song's information.
   * @returns A promise that resolves to a boolean indicating whether the edit operation was successful.
   */
  editSong: RendererHandler<(arg: EditSongDTO) => Promise<boolean>>

  /**
   * Deletes a song by its ID.
   * @returns A promise that resolves to a boolean indicating whether the delete operation was successful.
   */
  deleteSong: RendererHandler<(arg: DeleteSongDTO) => Promise<boolean>>

  /**
   * Retrieves all songs in a specific category.
   * @returns A promise that resolves to an array of song information.
   */
  getSongs: RendererHandler<(arg: GetSongsDTO) => Promise<SongInfo[]>>

  /**
   * Retrieves all unassigned songs.
   * @returns A promise that resolves to an array of unassigned song information.
   */
  getUnassignedSongs: RendererHandler<() => Promise<SongInfo[]>>
}
