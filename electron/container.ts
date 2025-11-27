// repositories
import { MediaCategoryRepository } from "./repositories/MediaCategoryRepository"
import { SettingsRepository } from "./repositories/SettingsRepository"
import { SongRepository } from "./repositories/SongRepository"
// services
import { DictionaryService } from "./services/DictionaryService"
import { MediaService } from "./services/MediaService"
import { SettingsService } from "./services/SettingsService"

/**
 * Dependency injection container for managing repositories and services.
 */
export class Container {
  settingsRepository = new SettingsRepository()
  mediaCategoryRepository = new MediaCategoryRepository()
  songRepository = new SongRepository()
  settingsService = new SettingsService(this.settingsRepository)
  dictionaryService = new DictionaryService(this.mediaCategoryRepository)
  mediaService = new MediaService(
    this.mediaCategoryRepository,
    this.songRepository
  )
}

export const container = new Container()
