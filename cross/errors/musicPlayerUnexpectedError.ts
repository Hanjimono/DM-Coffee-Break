import { MusicPlayerBaseError } from "./musicPlayerBaseError"

export const MUSIC_PLAYER_UNEXPECTED_ERROR_NAME = "MusicPlayerUnexpectedError"

export class MusicPlayerUnexpectedError extends MusicPlayerBaseError {
  constructor(parentMessage?: string) {
    const message =
      "Unexpected error occurred while trying to interact with the music player."
    super(message, parentMessage, { name: MUSIC_PLAYER_UNEXPECTED_ERROR_NAME })
  }
}
