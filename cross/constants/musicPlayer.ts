export const MUSIC_PLAYER_STATUS = {
  EMPTY: -1,
  STOPPED: 0,
  PLAYING: 1,
  PAUSED: 2,
  ERROR: 3,
  SWITCHING: 4
} as const

export const MUSIC_PLAYER_EMPTY_RESPONSE = {
  status: MUSIC_PLAYER_STATUS.EMPTY,
  song: null,
  queue: [],
  currentSongIndex: undefined
} as const
