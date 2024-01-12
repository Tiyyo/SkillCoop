import { render } from '@testing-library/react';
import Page404 from './index';
import { it } from 'vitest';

it('should render 404 page', () => {
  render(<Page404 />);
});
