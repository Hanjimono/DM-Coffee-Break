import { SettingsRepository } from "./repositories/SettingsRepository"
import { SettingsService } from "./services/SettingsService"

export class Container {
  settingsRepository = new SettingsRepository()
  settingsService = new SettingsService(this.settingsRepository)
}

export const container = new Container()
