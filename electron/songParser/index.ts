import { MEDIA_SOURCES } from "@cross/constants/media"
import {
  AVAILABLE_MEDIA_SOURCES,
  SongToParseData
} from "@cross/types/media/song"
import soundCloudDownloader from "soundcloud-downloader"

const SOURCES_PATTERNS = new Map<AVAILABLE_MEDIA_SOURCES, RegExp>([
  [MEDIA_SOURCES.SOUNDCLOUD, /^https?:\/\/(soundcloud\.com)\/(.*)$/],
  [MEDIA_SOURCES.YOUTUBE, /^https?:\/\/(youtube\.com|youtu\.be)\/(.*)$/],
  [MEDIA_SOURCES.SPOTIFY, /^https?:\/\/(open\.spotify\.com)\/(.*)$/]
])

export function getSourceFromUrl(url: string): AVAILABLE_MEDIA_SOURCES {
  for (const [source, pattern] of SOURCES_PATTERNS) {
    if (pattern.test(url)) return source
  }

  return MEDIA_SOURCES.UNSUPPORTED
}

async function parseSoundCloud(url: string) {
  const info = await soundCloudDownloader.getInfo(url)
  return {
    title: info.title,
    artist: info.user?.username,
    duration: info.duration ? Math.trunc(info.duration / 1000) : undefined,
    thumbnail: info.artwork_url,
    url: info.permalink_url || url,
    source: MEDIA_SOURCES.SOUNDCLOUD
  }
}

export async function parseSongInfo(data: SongToParseData) {
  let source = data.source || getSourceFromUrl(data.url)
  switch (source) {
    case MEDIA_SOURCES.SOUNDCLOUD:
      return await parseSoundCloud(data.url)
    default:
      throw new Error("Unsupported source")
  }
}
