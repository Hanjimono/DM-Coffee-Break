/** Specification for cIpc SDK mapping handlers to operation types */
export const cIpcSpecification = {
  database: {
    authenticate: { type: "query", key: "authenticate" },
    checkVersion: { type: "query", key: "version" },
    sync: {
      type: "mutation",
      key: "version",
      invalidateQueries: [["version"], ["settings"]]
    },
    getVersion: { type: "query", key: "version" },
    settings: {
      get: { type: "query", key: "settings" },
      set: {
        type: "mutation",
        key: "settings",
        invalidateQueries: [["settings"]]
      }
    },
    media: {
      saveCategory: {
        type: "mutation",
        key: "categories",
        invalidateQueries: [["categories"]]
      },
      deleteCategory: {
        type: "mutation",
        key: "categories",
        invalidateQueries: [["categories"]]
      },
      getCategories: { type: "query", key: "categories" },
      getSong: { type: "query", key: "song" },
      editSong: {
        type: "mutation",
        key: "song",
        invalidateQueries: [["song"], ["songs"], ["categories"]]
      },
      deleteSong: {
        type: "mutation",
        key: "song",
        invalidateQueries: [["song"], ["songs"], ["categories"]]
      },
      getSongs: { type: "query", key: "songs" },
      getUnassignedSongs: { type: "query", key: "songs" }
    },
    dictionary: {
      get: { type: "query", key: "dictionary" }
    },
    tag: {
      getAll: { type: "query", key: "tags" },
      edit: { type: "mutation", key: "tags", invalidateQueries: [["tags"]] },
      delete: { type: "mutation", key: "tags", invalidateQueries: [["tags"]] }
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
    play: {
      type: "mutation",
      key: "current-song",
      invalidateQueries: [["current-song"]]
    },
    resume: {
      type: "mutation",
      key: "current-song",
      invalidateQueries: [["current-song"]]
    },
    pause: {
      type: "mutation",
      key: "current-song",
      invalidateQueries: [["current-song"]]
    },
    stop: {
      type: "mutation",
      key: "current-song",
      invalidateQueries: [["current-song"]]
    }
  }
} as const
