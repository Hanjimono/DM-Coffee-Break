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

/**
 * Determines the media source from a given URL.
 *
 * @param url - The URL to be checked against known media source patterns.
 * @returns The media source that matches the URL pattern, or `MEDIA_SOURCES.UNSUPPORTED` if no match is found.
 */
export function getSourceFromUrl(url: string): AVAILABLE_MEDIA_SOURCES {
  for (const [source, pattern] of SOURCES_PATTERNS) {
    if (pattern.test(url)) return source
  }

  return MEDIA_SOURCES.UNSUPPORTED
}

/**
 * Parses information from a SoundCloud URL.
 *
 * @param url - The URL of the SoundCloud track to parse.
 * @returns A promise that resolves to an object containing the track's information
 */
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

/**
 * Parses song information based on the provided data.
 *
 * @param {string} data.url - The URL of the song to be parsed.
 * @param {string} [data.source] - The optional source of the song. If not provided, it will be determined from the URL.
 * @returns {Promise<any>} A promise that resolves with the parsed song information.
 * @throws {Error} Throws an error if the source is unsupported.
 */
export async function parseSongInfo(data: SongToParseData) {
  let source = data.source || getSourceFromUrl(data.url)
  switch (source) {
    case MEDIA_SOURCES.SOUNDCLOUD:
      return await parseSoundCloud(data.url)
    default:
      throw new Error("Unsupported source")
  }
}
