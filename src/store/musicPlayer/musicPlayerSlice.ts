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

async function getUserSettings() {
  if (typeof window === "undefined") return undefined
  const database = (window as any).database as DatabaseHandler
  return await database.settings.get()
}

function getMusicPlayer() {
  if (typeof window === "undefined") return undefined
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
  /** The currently playing song info. */
  currentSong: SongInfo | null
  /** Plays the specified song the way defined by user settings. */
  playSong: (song: SongInfo) => void
  /** Sets the chosen song as the current song. */
  setSong: (song: SongInfo | null) => void
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
  currentSong: null,
  playSong: async (song) => {
    const settings = await getUserSettings()
    if (!settings) return
    try {
      const { media } = settings
      const playerType = media.player.type
      switch (playerType) {
        case MEDIA_PLAYER_TYPES.BOT:
          // In this case, we need to send a play command to the bot
          const musicPlayer = getMusicPlayer()
          if (!musicPlayer) return
          const response = await musicPlayer.getStatus()
          if (response.error) {
            get().errorSnack(response.error.message)
            console.log("details:", response.error.details)
            return
          }
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
          get().successSnack("Song URL copied to clipboard!")
          break
      }
    } catch (error) {}
  },
  setSong: (song) => set({ currentSong: song })
})
