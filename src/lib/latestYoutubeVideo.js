import data from '../data/latestYoutubeVideo.json';

// A real YouTube video id is exactly 11 URL-safe base64 characters.
export const YOUTUBE_VIDEO_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;

export function isValidYoutubeVideoId(value) {
  return typeof value === 'string' && YOUTUBE_VIDEO_ID_PATTERN.test(value);
}

// Latest video resolved at build time by scripts/fetch-latest-video.mjs.
// Returns null when the committed data file is missing or malformed so callers
// can fall back to their own placeholder behavior.
export function getLatestYoutubeVideoId() {
  const videoId = data?.videoId;
  return isValidYoutubeVideoId(videoId) ? videoId : null;
}

export default data;
