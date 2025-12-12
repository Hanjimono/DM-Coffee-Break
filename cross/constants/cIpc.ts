import { cIpcHandler, SpecificationFor } from "@cross/types/handlers/main"

/** Specification for cIpc SDK mapping handlers to operation types */
export const cIpcSpecification: SpecificationFor<cIpcHandler> = {
  database: {
    authenticate: "query",
    checkVersion: "mutation",
    sync: "mutation",
    getVersion: "query",
    settings: {
      get: "query",
      set: "mutation"
    },
    media: {
      saveCategory: "mutation",
      deleteCategory: "mutation",
      getCategories: "query",
      getSong: "query",
      editSong: "mutation",
      deleteSong: "mutation",
      getSongs: "query",
      getUnassignedSongs: "query"
    },
    dictionary: {
      get: "query"
    },
    tag: {
      getAll: "query",
      edit: "mutation",
      delete: "mutation"
    }
  },
  songParser: {
    parseSongInfo: "mutation"
  },
  filesHandler: {
    openSelectFileDialog: "mutation"
  },
  musicPlayer: {
    getStatus: "query",
    play: "mutation",
    resume: "mutation",
    pause: "mutation",
    stop: "mutation"
  }
} as const
