import { cleanup, render, fireEvent } from '@testing-library/react';
import Home from '@/pages/Home';
import { Theme, NotificationsProvider, MessagesProvider } from '@/contexts';
import { Message } from '@/Api';
import { mockMessages } from '../utils/mocks';

const makeSut = (testMessages: Message[] | undefined = undefined) => {
  const sut = render(
    <Theme>
      <NotificationsProvider>
        <MessagesProvider testMessages={testMessages}>
          <Home />
        </MessagesProvider>
      </NotificationsProvider>
    </Theme>,
  );

  return {
    sut,
  };
};

const aLittle = (duration = 3000) =>
  new Promise((resolve) => {
    setTimeout(() => resolve('ok'), duration);
  });

describe('Home Page', () => {
  jest.setTimeout(8000);
  afterEach(cleanup);

  it('should stop/continue incoming messages when toggle button is clicked', async () => {
    const { sut } = makeSut();

    const toggleButton = sut.getByTestId('toggle-btn');
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveTextContent('Continue');

    let messagesCardsCount = sut.getAllByTestId('message-card').length;
    await aLittle();
    expect(sut.getAllByTestId('message-card').length).toBe(messagesCardsCount);

    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveTextContent('Stop');

    messagesCardsCount = sut.getAllByTestId('message-card').length;
    await aLittle();
    expect(sut.getAllByTestId('message-card').length).toBeGreaterThan(messagesCardsCount);
  });

  it('should clear all messages when clear button is clicked', async () => {
    const { sut } = makeSut();
    await aLittle();
    const clearButton = sut.getByTestId('clear-btn');
    fireEvent.click(clearButton);
    expect(sut.queryAllByTestId('message-card').length).toBe(0);
  });

  it('should clear a message when its respective clear button is clicked', async () => {
    const { sut } = makeSut();
    await aLittle();
    const messageCard = sut.getAllByTestId('message-card')[0];
    fireEvent.click(messageCard.querySelector('button') as Element);
    expect(messageCard).not.toBeInTheDocument();
  });

  it('should show a notification when a error message is received', async () => {
    const mockedErrorMessage = mockMessages()[0];
    const { sut } = makeSut([mockedErrorMessage]);
    expect(sut.getByTestId('notification')).toBeInTheDocument();
    expect(sut.getByTestId('notification')).toHaveTextContent(mockedErrorMessage.message);
  });

  it('should show correct count of error messages', () => {
    const mockedErrorMessage = mockMessages()[0];
    const { sut } = makeSut();
    const toggleButton = sut.getByTestId('toggle-btn');
    const clearButton = sut.getByTestId('clear-btn');
    fireEvent.click(toggleButton);
    fireEvent.click(clearButton);

    sut.rerender(
      <Theme>
        <NotificationsProvider>
          <MessagesProvider testMessages={[mockedErrorMessage]}>
            <Home />
          </MessagesProvider>
        </NotificationsProvider>
      </Theme>,
    );

    expect(sut.getByTestId('error-count')).toHaveTextContent('Count 1');
    sut.rerender(
      <Theme>
        <NotificationsProvider>
          <MessagesProvider testMessages={[mockedErrorMessage, mockedErrorMessage]}>
            <Home />
          </MessagesProvider>
        </NotificationsProvider>
      </Theme>,
    );

    expect(sut.getByTestId('error-count')).toHaveTextContent('Count 3');
  });

  it('should show correct count of warn messages', () => {
    const mockedWarnMessage = mockMessages()[1];
    const { sut } = makeSut();
    const toggleButton = sut.getByTestId('toggle-btn');
    const clearButton = sut.getByTestId('clear-btn');
    fireEvent.click(toggleButton);
    fireEvent.click(clearButton);

    sut.rerender(
      <Theme>
        <NotificationsProvider>
          <MessagesProvider testMessages={[mockedWarnMessage]}>
            <Home />
          </MessagesProvider>
        </NotificationsProvider>
      </Theme>,
    );

    expect(sut.getByTestId('warn-count')).toHaveTextContent('Count 1');

    sut.rerender(
      <Theme>
        <NotificationsProvider>
          <MessagesProvider testMessages={[mockedWarnMessage, mockedWarnMessage]}>
            <Home />
          </MessagesProvider>
        </NotificationsProvider>
      </Theme>,
    );

    expect(sut.getByTestId('warn-count')).toHaveTextContent('Count 3');
  });

  it('should show correct count of warn messages', () => {
    const mockedInfoMessage = mockMessages()[2];
    const { sut } = makeSut();
    const toggleButton = sut.getByTestId('toggle-btn');
    const clearButton = sut.getByTestId('clear-btn');
    fireEvent.click(toggleButton);
    fireEvent.click(clearButton);

    sut.rerender(
      <Theme>
        <NotificationsProvider>
          <MessagesProvider testMessages={[mockedInfoMessage]}>
            <Home />
          </MessagesProvider>
        </NotificationsProvider>
      </Theme>,
    );

    expect(sut.getByTestId('info-count')).toHaveTextContent('Count 1');

    sut.rerender(
      <Theme>
        <NotificationsProvider>
          <MessagesProvider testMessages={[mockedInfoMessage, mockedInfoMessage]}>
            <Home />
          </MessagesProvider>
        </NotificationsProvider>
      </Theme>,
    );

    expect(sut.getByTestId('info-count')).toHaveTextContent('Count 3');
  });
});
