import {
  getLatestYoutubeVideoId,
  isValidYoutubeVideoId,
} from './latestYoutubeVideo';
import data from '../data/latestYoutubeVideo.json';

describe('isValidYoutubeVideoId', () => {
  test('accepts real 11-character YouTube ids', () => {
    expect(isValidYoutubeVideoId('4s_CE5xVTbk')).toBe(true);
    expect(isValidYoutubeVideoId('_-abcdefghi')).toBe(true);
  });

  test('rejects ids that are not exactly 11 characters', () => {
    expect(isValidYoutubeVideoId('short')).toBe(false);
    expect(isValidYoutubeVideoId('toolongvideoid')).toBe(false);
    expect(isValidYoutubeVideoId('')).toBe(false);
  });

  test('rejects malformed characters and non-string values', () => {
    expect(isValidYoutubeVideoId('4s CE5xVTb!')).toBe(false);
    expect(isValidYoutubeVideoId(null)).toBe(false);
    expect(isValidYoutubeVideoId(undefined)).toBe(false);
    expect(isValidYoutubeVideoId(12345678901)).toBe(false);
  });
});

describe('getLatestYoutubeVideoId', () => {
  test('returns the committed video id from the data file', () => {
    expect(data.videoId).toBe('4s_CE5xVTbk');
    expect(getLatestYoutubeVideoId()).toBe('4s_CE5xVTbk');
  });
});
