export const MEDIA_TYPES = {
  UNKNOWN: 1,
  UPLOAD: 2,
  PARSED: 3
} as const

export type AVAILABLE_MEDIA_TYPE =
  (typeof MEDIA_TYPES)[keyof typeof MEDIA_TYPES]

export const MEDIA_SOURCES = {
  UNSUPPORTED: 1,
  PC: 2,
  SOUNDCLOUD: 3,
  YOUTUBE: 4,
  SPOTIFY: 5
} as const

export type AVAILABLE_MEDIA_SOURCES =
  (typeof MEDIA_SOURCES)[keyof typeof MEDIA_SOURCES]

export const MEDIA_SOURCE_INFO = {
  [MEDIA_SOURCES.UNSUPPORTED]: {
    name: "Unsupported",
    id: MEDIA_SOURCES.UNSUPPORTED,
    key: "unsupported",
    supported: false
  },
  [MEDIA_SOURCES.PC]: {
    name: "PC",
    id: MEDIA_SOURCES.PC,
    key: "pc",
    supported: true
  },
  [MEDIA_SOURCES.SOUNDCLOUD]: {
    name: "SoundCloud",
    id: MEDIA_SOURCES.SOUNDCLOUD,
    key: "soundcloud",
    supported: true
  },
  [MEDIA_SOURCES.YOUTUBE]: {
    name: "YouTube",
    id: MEDIA_SOURCES.YOUTUBE,
    key: "youtube",
    supported: false
  },
  [MEDIA_SOURCES.SPOTIFY]: {
    name: "Spotify",
    id: MEDIA_SOURCES.SPOTIFY,
    key: "spotify",
    supported: false
  }
} as const
