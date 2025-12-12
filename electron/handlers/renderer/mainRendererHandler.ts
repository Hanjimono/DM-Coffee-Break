import { cIpcHandler } from "@cross/types/handlers/main"
import { databaseRendererHandler } from "./databaseRendererHandler"
import { filesRendererHandler } from "./filesRendererHandler"
import { musicPlayerRendererHandler } from "./musicPlayerRendererHandler"
import { songParserRendererHandler } from "./songParserRendererHandler"

export const mainRendererHandler: cIpcHandler = {
  database: databaseRendererHandler,
  songParser: songParserRendererHandler,
  filesHandler: filesRendererHandler,
  musicPlayer: musicPlayerRendererHandler
}
