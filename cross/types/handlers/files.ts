import { RendererHandler } from "./main"

export interface FilesHandler {
  openSelectFileDialog: RendererHandler<() => Promise<string | undefined>>
}
