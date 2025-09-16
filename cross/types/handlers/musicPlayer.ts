import { MusicPlayerResponse } from "@cross/types/media/musicPlayer"
import { SongInfo } from "@cross/types/database/media"
import { RendererHandler } from "./main"

/**
 * Interface representing a handler for a music player.
 */
export interface MusicPlayerHandler {
  /**
   * Retrieves the current status of the music player.
   * @returns A promise that resolves to a MusicPlayerResponse object containing the status.
   */
  getStatus: RendererHandler<() => Promise<MusicPlayerResponse>>

  /**
   * Plays the specified song.
   * @param song - The information of the song to be played.
   * @returns A promise that resolves to a MusicPlayerResponse object.
   */
  play: RendererHandler<(song: SongInfo) => Promise<MusicPlayerResponse>>

  /**
   * Resumes the currently paused song.
   * @returns A promise that resolves to a MusicPlayerResponse object.
   */
  resume: RendererHandler<() => Promise<MusicPlayerResponse>>

  /**
   * Pauses the currently playing song.
   * @returns A promise that resolves to a MusicPlayerResponse object.
   */
  pause: RendererHandler<() => Promise<MusicPlayerResponse>>

  /**
   * Stops the currently playing song.
   * @returns A promise that resolves to a MusicPlayerResponse object.
   */
  stop: RendererHandler<() => Promise<MusicPlayerResponse>>
}
