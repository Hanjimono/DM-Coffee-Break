import { MusicPlayerBaseError } from "./musicPlayerBaseError"

export const MUSIC_PLAYER_RESUME_ERROR_NAME = "MusicPlayerResumeError"

export class MusicPlayerResumeError extends MusicPlayerBaseError {
  constructor(parentMessage?: string) {
    const message =
      "An error occurred while trying to resume the song. Please stop the player if it is still running and play a new song."
    super(message, parentMessage, {
      name: MUSIC_PLAYER_RESUME_ERROR_NAME
    })
  }
}
