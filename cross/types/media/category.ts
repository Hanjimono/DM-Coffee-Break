export interface MediaCategory {
  id?: number
  title: string
  hex?: string
  songsCount: number
  songs: {
    name: string
    thumbnail: string
  }[]
}
