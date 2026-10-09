// Build-time resolver for the channel's newest YouTube video.
//
// Standalone on purpose: it must not import from src/, so the build never
// depends on the app bundle. Uses the public RSS feed (no API key) and always
// exits 0, leaving the committed data file untouched when anything fails.
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const FEED_URL =
  'https://www.youtube.com/feeds/videos.xml?channel_id=UCWmDHQ0EY-cpjcrrcxM5Dzg';
const REQUEST_TIMEOUT_MS = 10000;
const VIDEO_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;

const scriptDir = dirname(fileURLToPath(import.meta.url));
const outputPath = resolve(scriptDir, '..', 'src', 'data', 'latestYoutubeVideo.json');

const warn = (message) => console.warn(`[fetch-latest-video] ${message}`);

function decodeEntities(value) {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&');
}

function extractFirstVideo(xml) {
  const entry = xml.match(/<entry>([\s\S]*?)<\/entry>/);
  if (!entry) return null;

  const videoId = entry[1].match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
  const title = entry[1].match(/<title>([\s\S]*?)<\/title>/);
  const published = entry[1].match(/<published>([^<]+)<\/published>/);
  if (!videoId || !title || !published) return null;

  return {
    videoId: videoId[1].trim(),
    title: decodeEntities(title[1].trim()),
    published: published[1].trim(),
  };
}

async function fetchFeed() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    return await fetch(FEED_URL, { signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function main() {
  try {
    const response = await fetchFeed();
    if (!response.ok) {
      warn(`feed responded with HTTP ${response.status}; keeping the existing data file`);
      return;
    }

    const video = extractFirstVideo(await response.text());
    if (!video) {
      warn('could not find a video entry in the feed; keeping the existing data file');
      return;
    }

    if (!VIDEO_ID_PATTERN.test(video.videoId)) {
      warn(`feed returned an invalid video id "${video.videoId}"; keeping the existing data file`);
      return;
    }

    const payload = {
      videoId: video.videoId,
      title: video.title,
      published: video.published,
      fetchedAt: new Date().toISOString(),
    };

    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
    console.log(
      `[fetch-latest-video] wrote ${payload.videoId} to src/data/latestYoutubeVideo.json`,
    );
  } catch (error) {
    warn(`fetch failed (${error?.message || error}); keeping the existing data file`);
  }
}

main();
