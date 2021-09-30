import { cleanup, render, screen, waitFor } from '@testing-library/react';
import faker from 'faker';
import Notification from '@/components/Notification';

const makeSut = (onClose = () => {}) => {
  render(
    <Notification id={faker.datatype.uuid()} message={faker.lorem.sentence()} onClose={onClose} />,
  );
};

const aLittle = (duration = 3000) =>
  new Promise((resolve) => {
    setTimeout(() => resolve('ok'), duration);
  });

describe('Notification Component', () => {
  afterEach(() => cleanup());

  it('should appear at the top right of the application', () => {
    makeSut();
    expect(screen.getByTestId('notification')).toBeInTheDocument();
    expect(screen.getByTestId('notification')).toHaveStyle({ top: '0px', right: '0px' });
  });

  it('should disappear after 2 seconds', async () => {
    makeSut();
    const notification = screen.queryByTestId('notification');
    await aLittle(2000);
    await waitFor(() => {
      expect(notification).not.toBeInTheDocument();
    });
  });

  it('should call onClose after disappear', async () => {
    const onClose = jest.fn();
    makeSut(onClose);
    await aLittle(2000);
    await waitFor(() => {
      expect(onClose).toHaveBeenCalled();
    });
  });
});
