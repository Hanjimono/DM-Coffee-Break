// System
import { StateCreator } from "zustand"
import { current, produce } from "immer"
import { SongInfo } from "@cross/types/database/media"
import { DatabaseHandler } from "@cross/types/handlers/database"
import { MEDIA_PLAYER_TYPES } from "@cross/constants/media"
import {
  MEDIA_PLAYER_SETTINGS_API_KEYS,
  MEDIA_PLAYER_SETTINGS_CLIPBOARD_KEYS
} from "@cross/constants/settingsMedia"
import { AVAILABLE_MEDIA_PLAYER_SETTINGS_API_KEYS } from "@cross/types/database/settings/media"
import { MusicPlayerHandler } from "@cross/types/handlers/musicPlayer"
import { SnackbarState } from "../snackbar/snackbarSlice"
import {
  MusicPlayerAvailableStatus,
  MusicPlayerResponse
} from "@cross/types/media/musicPlayer"
import { MUSIC_PLAYER_STATUS } from "@cross/constants/musicPlayer"

async function getUserSettings() {
  if (typeof window === "undefined") return undefined
  const database = (window as any).database as DatabaseHandler
  return await database.settings.get()
}

function getMusicPlayer() {
  return (window as any).musicPlayer as MusicPlayerHandler
}

/**
 * Sends a command to a Discord channel via a webhook URL.
 *
 * @param settings - An object containing the media player settings.
 * @param url - The URL to be included in the command, if applicable.
 * @param isStop - A boolean indicating whether the command is to stop the media player.
 * @returns A promise that resolves to the response of the fetch request.
 */
async function sendCommandToDiscordChannel(
  settings: Record<AVAILABLE_MEDIA_PLAYER_SETTINGS_API_KEYS, string>,
  url?: string,
  isStop?: boolean
) {
  return await fetch(settings[MEDIA_PLAYER_SETTINGS_API_KEYS.WEBHOOK_URL], {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      content: isStop
        ? settings[MEDIA_PLAYER_SETTINGS_API_KEYS.STOP_PREFIX]
        : settings[MEDIA_PLAYER_SETTINGS_API_KEYS.PLAY_PREFIX] +
          " " +
          settings[MEDIA_PLAYER_SETTINGS_API_KEYS.CHANNEL_ID] +
          " " +
          url
    })
  })
}

/**
 * Represents the state of the music player system.
 */
export interface MusicPlayerState {
  musicPlayerLoading: boolean
  /** The currently playing song info. */
  currentSong: SongInfo | null
  /** The queue of songs to be played. */
  currentQueue: SongInfo[]
  /** The index of the current song in the queue. */
  indexOfCurrentSong?: number
  /** The status of the music player system. */
  musicPlayerStatus: MusicPlayerAvailableStatus
  /** Plays the specified song the way defined by user settings. */
  playSong: (song: SongInfo) => void
  /** Stops player and clear queue */
  stopSong: () => void
  pauseSong: () => void
  resumeSong: () => void
  getStatus: () => void
  setStatus: (response: MusicPlayerResponse, message?: string) => void
  /** Sets the chosen song as the current song. */
  setSong: (song: SongInfo | null) => void
  /** Handles errors from the music bot, clear status and show message to user */
  handleMusicBotError: (response: MusicPlayerResponse) => void
  setMusicPlayerLoading: (loading?: boolean) => void
}

/**
 * Store for managing the state of the music player system.
 */
export const createMusicPlayerStore: StateCreator<
  MusicPlayerState & SnackbarState,
  [],
  [],
  MusicPlayerState
> = (set, get) => ({
  musicPlayerLoading: false,
  currentSong: null,
  currentQueue: [],
  musicPlayerStatus: MUSIC_PLAYER_STATUS.STOPPED,
  playSong: async (song) => {
    const settings = await getUserSettings()
    if (!settings) return
    try {
      const { media } = settings
      const playerType = media.player.type
      switch (playerType) {
        case MEDIA_PLAYER_TYPES.BOT:
          clearTimeout((window as any).musicTimer)
          clearTimeout((window as any).musicLoadingTimer)
          ;(window as any).musicLoadingTimer = setTimeout(
            get().setMusicPlayerLoading,
            700
          )
          // In this case, we need to send a play command to the bot
          const musicPlayer = getMusicPlayer()
          const response = await musicPlayer.play(song)
          get().setStatus(response, "The song is now playing!")
          break
        case MEDIA_PLAYER_TYPES.API:
          // In this case, we need to send song url with command via Discord API
          if (
            !media.player.api[MEDIA_PLAYER_SETTINGS_API_KEYS.CHANNEL_ID] ||
            !media.player.api[MEDIA_PLAYER_SETTINGS_API_KEYS.PLAY_PREFIX] ||
            !media.player.api[MEDIA_PLAYER_SETTINGS_API_KEYS.WEBHOOK_URL]
          )
            return
          // TODO: maybe add a result check here
          sendCommandToDiscordChannel(media.player.api, song.url)
          // Set the song as the current song so we can send a stop command later
          get().setSong(song)
          get().successSnack("Message sent to Discord channel!")
          break
        case MEDIA_PLAYER_TYPES.CLIPBOARD:
        default:
          // In this case, we just need to copy the song URL to the clipboard, nothing else.
          await navigator.clipboard.writeText(
            media.player.clipboard[
              MEDIA_PLAYER_SETTINGS_CLIPBOARD_KEYS.PREFIX
            ] +
              " " +
              song.url
          )
          get().setSong(null)
          get().successSnack("The song URL copied to clipboard!")
          break
      }
    } catch (error) {
      console.log(error)
    } finally {
      clearTimeout((window as any).musicLoadingTimer)
      get().setMusicPlayerLoading(false)
    }
  },
  stopSong: async () => {
    const settings = await getUserSettings()
    if (!settings) return
    try {
      const { media } = settings
      const playerType = media.player.type
      if (playerType == MEDIA_PLAYER_TYPES.BOT) {
        clearTimeout((window as any).musicTimer)
        clearTimeout((window as any).musicLoadingTimer)
        ;(window as any).musicLoadingTimer = setTimeout(
          get().setMusicPlayerLoading,
          700
        )
        const musicPlayer = getMusicPlayer()
        const response = await musicPlayer.stop()
        get().setStatus(response, "The music player has been stopped!")
      }
    } catch (error) {
      console.log(error)
    } finally {
      clearTimeout((window as any).musicLoadingTimer)
      get().setMusicPlayerLoading(false)
    }
  },
  pauseSong: async () => {
    const settings = await getUserSettings()
    if (!settings) return
    try {
      const { media } = settings
      const playerType = media.player.type
      if (playerType == MEDIA_PLAYER_TYPES.BOT) {
        clearTimeout((window as any).musicTimer)
        clearTimeout((window as any).musicLoadingTimer)
        ;(window as any).musicLoadingTimer = setTimeout(
          get().setMusicPlayerLoading,
          700
        )
        const musicPlayer = getMusicPlayer()
        const response = await musicPlayer.pause()
        get().setStatus(response)
      }
    } catch (error) {
      console.log(error)
    } finally {
      clearTimeout((window as any).musicLoadingTimer)
      get().setMusicPlayerLoading(false)
    }
  },
  resumeSong: async () => {
    const settings = await getUserSettings()
    if (!settings) return
    try {
      const { media } = settings
      const playerType = media.player.type
      if (playerType == MEDIA_PLAYER_TYPES.BOT) {
        clearTimeout((window as any).musicTimer)
        clearTimeout((window as any).musicLoadingTimer)
        ;(window as any).musicLoadingTimer = setTimeout(
          get().setMusicPlayerLoading,
          700
        )
        const musicPlayer = getMusicPlayer()
        const response = await musicPlayer.resume()
        get().setStatus(response)
      }
    } catch (error) {
      console.log(error)
    } finally {
      clearTimeout((window as any).musicLoadingTimer)
      get().setMusicPlayerLoading(false)
    }
  },
  setSong: (song) => set({ currentSong: song }),
  getStatus: async () => {
    clearTimeout((window as any).musicTimer)
    const musicPlayer = getMusicPlayer()
    const response = await musicPlayer.getStatus()
    get().setStatus(response)
  },
  setStatus: (response, message) => {
    clearTimeout((window as any).musicTimer)
    if (response.error) {
      get().handleMusicBotError(response)
      return
    }
    if (
      response.status !== MUSIC_PLAYER_STATUS.STOPPED &&
      response.status !== MUSIC_PLAYER_STATUS.EMPTY
    ) {
      ;(window as any).musicTimer = setTimeout(get().getStatus, 1000)
    }
    set({
      musicPlayerStatus: response.status,
      currentSong: response.song,
      currentQueue: response.queue || [],
      indexOfCurrentSong: response.currentSongIndex
    })
    if (message) {
      get().successSnack(message)
    }
  },
  setMusicPlayerLoading: (loading = true) => {
    set({ musicPlayerLoading: loading })
  },
  handleMusicBotError: (response: MusicPlayerResponse) => {
    if (response.error) {
      get().criticalSnack(response.error.message)
      if (response.error.details) {
        console.log("details:", response.error.details)
      }
      set({
        musicPlayerStatus: response.status,
        currentSong: null,
        currentQueue: [],
        indexOfCurrentSong: undefined
      })
    }
  }
})
