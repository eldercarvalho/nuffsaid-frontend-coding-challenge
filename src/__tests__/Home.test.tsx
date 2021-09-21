import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '@/pages/Home';

test('renders learn react link', () => {
  const comp = render(<Home />);
  expect(comp).toBeTruthy();
});
