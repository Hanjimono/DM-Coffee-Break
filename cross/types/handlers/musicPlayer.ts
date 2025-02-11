import { MusicPlayerResponse } from "@cross/types/media/musicPlayer"
import { SongInfo } from "@cross/types/database/media"

/**
 * Interface representing a handler for a music player.
 */
export interface MusicPlayerHandler {
  /**
   * Retrieves the current status of the music player.
   * @returns A promise that resolves to a MusicPlayerResponse object containing the status.
   */
  getStatus: () => Promise<MusicPlayerResponse>

  /**
   * Plays the specified song.
   * @param song - The information of the song to be played.
   * @returns A promise that resolves to a MusicPlayerResponse object.
   */
  play: (song: SongInfo) => Promise<MusicPlayerResponse>

  /**
   * Resumes the currently paused song.
   * @returns A promise that resolves to a MusicPlayerResponse object.
   */
  resume: () => Promise<MusicPlayerResponse>

  /**
   * Pauses the currently playing song.
   * @returns A promise that resolves to a MusicPlayerResponse object.
   */
  pause: () => Promise<MusicPlayerResponse>

  /**
   * Stops the currently playing song.
   * @returns A promise that resolves to a MusicPlayerResponse object.
   */
  stop: () => Promise<MusicPlayerResponse>
}
