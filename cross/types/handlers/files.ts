export interface FilesHandler {
  openSelectFileDialog: () => Promise<string | undefined>
}
