import { MusicPlayerBaseError } from "./musicPlayerBaseError"

export const MUSIC_PLAYER_CONNECTION_ERROR_NAME = "MusicPlayerConnectionError"

export class MusicPlayerConnectionError extends MusicPlayerBaseError {
  constructor(parentMessage?: string) {
    const message =
      "Connection to discord failed after exceeding the maximum number of attempts."
    super(message, parentMessage, { name: MUSIC_PLAYER_CONNECTION_ERROR_NAME })
  }
}
