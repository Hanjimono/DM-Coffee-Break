import { MUSIC_PLAYER_STATUS } from "@cross/constants/musicPlayer"
import { MusicPlayerResponse } from "@cross/types/media/musicPlayer"

export class MusicPlayerBaseError extends Error {
  public name = this.constructor.name
  public details?: string

  constructor(message?: string, details?: string, opts?: { name?: string }) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)
  }

  public getResponse: () => MusicPlayerResponse = () => {
    return {
      status: MUSIC_PLAYER_STATUS.ERROR,
      error: {
        message: this.message,
        details: this.details
      }
    }
  }
}
