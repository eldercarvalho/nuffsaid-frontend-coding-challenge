import { render } from '@testing-library/react';
import Navbar from '@/components/Navbar';

describe('Navbar Component', () => {
  it('should render title with the correct text', () => {
    const sut = render(<Navbar />);
    const title = sut.getByText('nuffsaid.com Coding Challenge');
    expect(title).toBeInTheDocument();
  });
});
