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
  expect(screen.getByText('AMPUDIA')).toBeTruthy();
});
