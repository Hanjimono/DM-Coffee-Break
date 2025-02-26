import { MusicPlayerBaseError } from "./musicPlayerBaseError"

export const MUSIC_PLAYER_STOP_ERROR_NAME = "MusicPlayerStopError"

export class MusicPlayerStopError extends MusicPlayerBaseError {
  constructor(parentMessage?: string) {
    const message =
      "Could not stop the music player. An unexpected error occurred. Please try again."
    super(message, parentMessage, { name: MUSIC_PLAYER_STOP_ERROR_NAME })
  }
}
