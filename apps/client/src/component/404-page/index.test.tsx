import { render, screen } from '@testing-library/react';
import Page404 from './index';
import { it, expect } from 'vitest';

it('should render 404 page', () => {
  render(<Page404 />);
  const message = screen.getByText(/404/i);
  expect(message).toBeInTheDocument();
});
