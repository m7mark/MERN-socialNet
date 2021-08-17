import { render, screen } from '@testing-library/react';
import MainApp from './App.tsxOld';

test('renders learn react link', () => {
  render(<MainApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
