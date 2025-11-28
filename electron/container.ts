// repositories
import { MediaCategoryRepository } from "./repositories/MediaCategoryRepository"
import { SettingsRepository } from "./repositories/SettingsRepository"
import { SongRepository } from "./repositories/SongRepository"
import { TagRepository } from "./repositories/TagRepository"
// services
import { DictionaryService } from "./services/DictionaryService"
import { MediaService } from "./services/MediaService"
import { SettingsService } from "./services/SettingsService"
import { TagService } from "./services/TagService"

/**
 * Dependency injection container for managing repositories and services.
 */
export class Container {
  settingsRepository = new SettingsRepository()
  mediaCategoryRepository = new MediaCategoryRepository()
  songRepository = new SongRepository()
  tagRepository = new TagRepository()
  settingsService = new SettingsService(this.settingsRepository)
  dictionaryService = new DictionaryService(this.mediaCategoryRepository)
  mediaService = new MediaService(
    this.mediaCategoryRepository,
    this.songRepository
  )
  tagService = new TagService(this.tagRepository)
}

export const container = new Container()
