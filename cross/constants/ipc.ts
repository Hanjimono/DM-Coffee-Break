export const DATABASE_IPC_CHANNELS = {
  AUTHENTICATE: "database-authenticate",
  CHECK_VERSION: "database-check-version",
  SYNC: "database-sync",
  GET_VERSION: "database-get-version",
  SETTINGS_GET: "database-settings-get",
  SETTINGS_SET: "database-settings-set"
} as const

export const DICTIONARY_IPC_CHANNELS = {
  GET: "dictionary-get"
} as const

export const FILES_IPC_CHANNELS = {
  OPEN_SELECT_FILE_DIALOG: "files-open-select-file-dialog"
} as const

export const MEDIA_IPC_CHANNELS = {
  SAVE_CATEGORY: "media-save-category",
  DELETE_CATEGORY: "media-delete-category",
  GET_CATEGORIES: "media-get-categories",
  GET_SONG: "media-get-song",
  EDIT_SONG: "media-edit-song",
  DELETE_SONG: "media-delete-song",
  GET_SONGS: "media-get-songs",
  GET_UNASSIGNED_SONGS: "media-get-unassigned-songs"
} as const

export const MUSIC_IPC_CHANNELS = {
  GET_STATUS: "music-player-get-status",
  PLAY: "music-player-play",
  RESUME: "music-player-resume",
  PAUSE: "music-player-pause",
  STOP: "music-player-stop"
} as const

export const SONG_INFO_SETTINGS_IPC_CHANNELS = {
  GET: "song-info-settings-get",
  SET: "song-info-settings-set",
  SET_ONE: "song-info-settings-set-one"
} as const

export const SONG_PARSER_IPC_CHANNELS = {
  PARSE_SONG_INFO: "song-parser-parse-song-info"
} as const

export const TAG_IPC_CHANNELS = {
  GET_ALL: "tag-get-all",
  EDIT: "tag-edit",
  DELETE: "tag-delete"
} as const
