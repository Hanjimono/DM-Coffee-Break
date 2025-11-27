// helpers
import { handleIpcMain } from "./main"
// constants
import { MEDIA_IPC_CHANNELS } from "@cross/constants/ipc"
// containers
import { container } from "../../container"
// types
import { SaveMediaCategoryDTO } from "@cross/types/media/category"
import { SongInfo } from "@cross/types/database/media"
import { MediaHandler } from "@cross/types/handlers/media"
/**
 * Function to get all media categories
 */
handleIpcMain<MediaHandler["getCategories"]>(
  MEDIA_IPC_CHANNELS.GET_CATEGORIES,
  async () => {
    return await container.mediaService.getCategoriesWithSongsInfo()
  }
)

/**
 * Function to save or create a media category
 */
handleIpcMain<MediaHandler["saveCategory"]>(
  MEDIA_IPC_CHANNELS.SAVE_CATEGORY,
  async (event, categoryInfo: SaveMediaCategoryDTO) => {
    return await container.mediaService.saveCategory(categoryInfo)
  }
)

/**
 * Function to delete a media category
 */
handleIpcMain<MediaHandler["deleteCategory"]>(
  MEDIA_IPC_CHANNELS.DELETE_CATEGORY,
  async (event, id) => {
    return await container.mediaService.deleteCategory(id)
  }
)

/**
 * Function to create or edit a song
 */
handleIpcMain<MediaHandler["editSong"]>(
  MEDIA_IPC_CHANNELS.EDIT_SONG,
  async (event, song: SongInfo) => {
    return await container.mediaService.saveSong(song)
  }
)

/**
 * Function to delete a song
 */
handleIpcMain<MediaHandler["deleteSong"]>(
  MEDIA_IPC_CHANNELS.DELETE_SONG,
  async (event, id) => {
    return await container.mediaService.deleteSong(id)
  }
)

/**
 * Function to get all songs for a category
 */
handleIpcMain<MediaHandler["getSongs"]>(
  MEDIA_IPC_CHANNELS.GET_SONGS,
  async (event, categoryId) => {
    return await container.mediaService.getSongsByCategoryId(categoryId)
  }
)

/**
 * Function to get unassigned songs
 */
handleIpcMain<MediaHandler["getUnassignedSongs"]>(
  MEDIA_IPC_CHANNELS.GET_UNASSIGNED_SONGS,
  async () => {
    return await container.mediaService.getSongsByCategoryId(null)
  }
)

/**
 * Function to get a song by id
 */
handleIpcMain<MediaHandler["getSong"]>(
  MEDIA_IPC_CHANNELS.GET_SONG,
  async (event, id) => {
    return await container.mediaService.getSongById(id)
  }
)
