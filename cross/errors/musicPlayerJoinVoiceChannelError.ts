import { MusicPlayerBaseError } from "./musicPlayerBaseError"

export const MUSIC_PLAYER_JOIN_VOICE_CHANNEL_ERROR_NAME =
  "MusicPlayerJoinVoiceChannelError"

export class MusicPlayerJoinVoiceChannelError extends MusicPlayerBaseError {
  constructor(parentMessage?: string) {
    const message =
      "Could not join the voice channel. Please make sure that the bot has the necessary permissions."
    super(message, parentMessage, {
      name: MUSIC_PLAYER_JOIN_VOICE_CHANNEL_ERROR_NAME
    })
  }
}
