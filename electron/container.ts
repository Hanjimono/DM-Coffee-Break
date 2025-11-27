// repositories
import { MediaCategoryRepository } from "./repositories/MediaCategoryRepository"
import { SettingsRepository } from "./repositories/SettingsRepository"
// services
import { DictionaryService } from "./services/DictionaryService"
import { SettingsService } from "./services/SettingsService"

export class Container {
  settingsRepository = new SettingsRepository()
  mediaCategoryRepository = new MediaCategoryRepository()
  settingsService = new SettingsService(this.settingsRepository)
  dictionaryService = new DictionaryService(this.mediaCategoryRepository)
}

export const container = new Container()
