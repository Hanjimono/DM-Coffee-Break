import { MediaCategory } from "@cross/types/media/category"
import { Song } from "../../database/models/song"
import { MediaCategory as MediaCategoryModel } from "../../database/models/mediaCategory"
import { SongInfo } from "@cross/types/database/media"
import { TagToSong } from "../../database/models/tagToSong"
import {
  MEDIA_CATEGORY_DEFAULT_SONGS_COUNT,
  UNSORTED_CATEGORY
} from "@cross/constants/media"
import { handleIpcMain } from "./main"
import { MediaHandler } from "@cross/types/handlers/media"
import { MEDIA_IPC_CHANNELS } from "@cross/constants/ipc"

/**
 * Function to get all media categories
 */
handleIpcMain<MediaHandler["getCategories"]>(
  MEDIA_IPC_CHANNELS.GET_CATEGORIES,
  async () => {
    let categories: MediaCategory[] = []
    let categoriesFromDb = await MediaCategoryModel.findAll()
    for (const category of categoriesFromDb) {
      const songs = await Song.findAll({
        where: { categoryId: category.id },
        limit: MEDIA_CATEGORY_DEFAULT_SONGS_COUNT
      })
      const formattedSongs: SongInfo[] = []
      for (const song of songs) {
        formattedSongs.push(await song.getInfo())
      }
      const songsCount = await Song.count({
        where: { categoryId: category.id }
      })
      categories.push({
        id: category.id,
        title: category.title,
        hex: category.hex,
        songs: formattedSongs,
        songsCount: songsCount
      })
    }
    const unsortedSongs = await Song.findAll({
      where: { categoryId: null },
      limit: MEDIA_CATEGORY_DEFAULT_SONGS_COUNT
    })
    const formattedUnsortedSongs = []
    for (const song of unsortedSongs) {
      formattedUnsortedSongs.push(await song.getInfo())
    }
    const unsortedSongsCount = await Song.count({
      where: { categoryId: null }
    })
    if (unsortedSongsCount > 0) {
      categories.push({
        ...UNSORTED_CATEGORY,
        songs: formattedUnsortedSongs,
        songsCount: unsortedSongsCount
      })
    }
    return categories
  }
)

/**
 * Function to save or create a media category
 */
handleIpcMain<MediaHandler["saveCategory"]>(
  MEDIA_IPC_CHANNELS.SAVE_CATEGORY,
  async (event, categoryInfo: MediaCategory) => {
    try {
      if (categoryInfo.id) {
        let category = await MediaCategoryModel.findOne({
          where: { id: categoryInfo.id }
        })
        if (category) {
          await category.update(categoryInfo)
          return true
        }
        return false
      }
      await MediaCategoryModel.create({ ...categoryInfo })
      return true
    } catch (error) {
      return false
    }
  }
)

/**
 * Function to delete a media category
 */
handleIpcMain<MediaHandler["deleteCategory"]>(
  MEDIA_IPC_CHANNELS.DELETE_CATEGORY,
  async (event, id) => {
    try {
      let category = await MediaCategoryModel.findOne({
        where: { id }
      })
      if (category) {
        await category.destroy()
        //TODO: remove category from all media items inside this category
        return true
      }
      return false
    } catch (error) {
      return false
    }
  }
)

/**
 * Function to create or edit a song
 */
handleIpcMain<MediaHandler["editSong"]>(
  MEDIA_IPC_CHANNELS.EDIT_SONG,
  async (event, song: SongInfo) => {
    try {
      if (song.id) {
        const tags = song.tags
        delete song.tags
        let songFromDb = await Song.findOne({
          where: { id: song.id }
        })
        if (songFromDb) {
          await songFromDb.update(song)
          if (tags && tags.length > 0) {
            await songFromDb.setTags(tags)
          }
          return true
        }
        return false
      }
      await Song.create({ ...song })
      return true
    } catch (error) {
      return false
    }
  }
)

/**
 * Function to delete a song
 */
handleIpcMain<MediaHandler["deleteSong"]>(
  MEDIA_IPC_CHANNELS.DELETE_SONG,
  async (event, id) => {
    try {
      let song = await Song.findOne({
        where: { id }
      })
      if (song) {
        await TagToSong.destroy({
          where: { songId: id }
        })
        await song.destroy()
        return true
      }
      return false
    } catch (error) {
      return false
    }
  }
)

/**
 * Function to get all songs for a category
 */
handleIpcMain<MediaHandler["getSongs"]>(
  MEDIA_IPC_CHANNELS.GET_SONGS,
  async (event, categoryId) => {
    let songs = []
    let songsFromDb = await Song.findAll({
      where: { categoryId }
    })
    for (const song of songsFromDb) {
      songs.push(await song.getInfo())
    }
    return songs
  }
)

/**
 * Function to get unassigned songs
 */
handleIpcMain<MediaHandler["getUnassignedSongs"]>(
  MEDIA_IPC_CHANNELS.GET_UNASSIGNED_SONGS,
  async () => {
    let songs = []
    let songsFromDb = await Song.findAll({
      where: { categoryId: null }
    })
    for (const song of songsFromDb) {
      songs.push(await song.getInfo())
    }
    return songs
  }
)

/**
 * Function to get a song by id
 */
handleIpcMain<MediaHandler["getSong"]>(
  MEDIA_IPC_CHANNELS.GET_SONG,
  async (event, id) => {
    let song = await Song.findOne({
      where: { id }
    })
    if (song) {
      return await song.getInfo()
    }
    return undefined
  }
)
