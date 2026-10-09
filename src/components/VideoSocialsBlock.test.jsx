import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import VideoSocialsBlock from './VideoSocialsBlock';
import { LanguageProvider } from '../context/LanguageContext';
import { getLatestYoutubeVideoId } from '../lib/latestYoutubeVideo';

// Mutating global state is required only because component effects observe the
// element through IntersectionObserver; mirrors the stub in src/App.test.js.
beforeAll(() => {
  global.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

const renderBlock = (props = {}) =>
  render(
    <LanguageProvider>
      <VideoSocialsBlock {...props} />
    </LanguageProvider>,
  );

const iframeSrc = () => document.querySelector('iframe')?.getAttribute('src');

test('an explicit videoId prop wins over the generated latest id', () => {
  renderBlock({ videoId: 'ExplicitId1' });
  expect(iframeSrc()).toContain('/embed/ExplicitId1');
});

test('an undefined videoId falls back to the generated latest id', () => {
  const latestId = getLatestYoutubeVideoId();
  expect(latestId).toBe('4s_CE5xVTbk');

  renderBlock();
  expect(iframeSrc()).toContain(`/embed/${latestId}`);
});

test('videoId={null} keeps rendering the placeholder instead of an iframe', () => {
  renderBlock({ videoId: null });
  expect(document.querySelector('iframe')).toBeNull();
  expect(screen.getByText('Video coming soon')).toBeInTheDocument();
});

test('videoId="" keeps rendering the placeholder instead of an iframe', () => {
  renderBlock({ videoId: '' });
  expect(document.querySelector('iframe')).toBeNull();
  expect(screen.getByText('Video coming soon')).toBeInTheDocument();
});
