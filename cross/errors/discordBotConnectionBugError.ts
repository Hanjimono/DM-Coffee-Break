import { MusicPlayerBaseError } from "./musicPlayerBaseError"

export const DISCORD_BOT_CONNECTION_BUG_ERROR_NAME =
  "DiscordBotConnectionBugError"

export class DiscordBotConnectionBugError extends MusicPlayerBaseError {
  constructor(parentMessage?: string) {
    const message = "Discord bot connection bug."
    super(message, parentMessage, {
      name: DISCORD_BOT_CONNECTION_BUG_ERROR_NAME
    })
  }
}
