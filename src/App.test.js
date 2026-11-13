import { render, screen } from '@testing-library/react';
import App from './App';

beforeAll(() => {
  global.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

test('renders the site navigation', () => {
  render(<App />);
  expect(screen.getByText('ALAN')).toBeTruthy();
  // 'AMPUDIA' appears both in the navbar brand and the intro logo overlay.
  expect(screen.getAllByText('AMPUDIA').length).toBeGreaterThan(0);
});
