/** Specification for cIpc SDK mapping handlers to operation types */
export const cIpcSpecification = {
  database: {
    authenticate: { type: "query", key: "authenticate" },
    checkVersion: { type: "query", key: "version" },
    sync: {
      type: "mutation",
      key: "version",
      invalidateQueries: [["version"]]
    },
    getVersion: { type: "query", key: "version" },
    settings: {
      get: { type: "query", key: "settings" },
      set: { type: "mutation", key: "settings" }
    },
    media: {
      saveCategory: { type: "mutation", key: "category" },
      deleteCategory: { type: "mutation", key: "category" },
      getCategories: { type: "query", key: "category" },
      getSong: { type: "query", key: "song" },
      editSong: { type: "mutation", key: "song" },
      deleteSong: { type: "mutation", key: "song" },
      getSongs: { type: "query", key: "songs" },
      getUnassignedSongs: { type: "query", key: "songs" }
    },
    dictionary: {
      get: { type: "query", key: "dictionary" }
    },
    tag: {
      getAll: { type: "query", key: "tags" },
      edit: { type: "mutation", key: "tag" },
      delete: { type: "mutation", key: "tags" }
    }
  },
  songParser: {
    parseSongInfo: { type: "mutation", key: "parsed-song" }
  },
  filesHandler: {
    openSelectFileDialog: { type: "mutation", key: "selected-file" }
  },
  musicPlayer: {
    getStatus: { type: "query", key: "current-song" },
    play: { type: "mutation", key: "current-song" },
    resume: { type: "mutation", key: "current-song" },
    pause: { type: "mutation", key: "current-song" },
    stop: { type: "mutation", key: "current-song" }
  }
} as const
