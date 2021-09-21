import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '@/pages/Home';

type SutType = {
  sut: React.FC;
};

const makeSut = () => {
  const sut = render(<Home />);
};

test('renders learn react link', () => {
  const comp = render(<Home />);
  expect(comp).toBeTruthy();
});
