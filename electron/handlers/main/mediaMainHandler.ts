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
  async (event, data: SaveMediaCategoryDTO) => {
    return await container.mediaService.saveCategory(data)
  }
)

/**
 * Function to delete a media category
 */
handleIpcMain<MediaHandler["deleteCategory"]>(
  MEDIA_IPC_CHANNELS.DELETE_CATEGORY,
  async (event, data) => {
    return await container.mediaService.deleteCategory(data.id)
  }
)

/**
 * Function to create or edit a song
 */
handleIpcMain<MediaHandler["editSong"]>(
  MEDIA_IPC_CHANNELS.EDIT_SONG,
  async (event, data) => {
    return await container.mediaService.saveSong(data)
  }
)

/**
 * Function to delete a song
 */
handleIpcMain<MediaHandler["deleteSong"]>(
  MEDIA_IPC_CHANNELS.DELETE_SONG,
  async (event, data) => {
    return await container.mediaService.deleteSong(data.id)
  }
)

/**
 * Function to get all songs for a category
 */
handleIpcMain<MediaHandler["getSongs"]>(
  MEDIA_IPC_CHANNELS.GET_SONGS,
  async (event, data) => {
    return await container.mediaService.getSongsByCategoryId(data.categoryId)
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
  async (event, data) => {
    return await container.mediaService.getSongById(data.id)
  }
)
