import { render, screen } from '@testing-library/react';
import App from './App';

test('render app', () => {
  render(<App />);
  const element = screen.getByText(/Custom Hook - useFormattedData/i);
  expect(element).toBeInTheDocument();
});
