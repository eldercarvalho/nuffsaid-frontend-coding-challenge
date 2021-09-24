import { cleanup, render, fireEvent } from '@testing-library/react';
import MessageCard, { MessageCardProps } from '@/components/MessageCard';
import faker from 'faker';
import { Priority } from '@/services/Api';
import { Theme } from '@/contexts/theme';

const makeSut = (props: MessageCardProps) => {
  const sut = render(
    <Theme>
      <MessageCard {...props} />
    </Theme>,
  );

  return {
    sut,
  };
};

const createMessage = (priority: Priority) => ({
  id: faker.datatype.uuid(),
  message: faker.lorem.sentence(),
  priority,
});

describe('MessageCard Component', () => {
  afterEach(cleanup);

  it('should set the correct background color when an error message is provided', () => {
    const { sut } = makeSut({ data: createMessage(Priority.Error) });
    expect(sut.getByTestId('message-card')).toHaveStyle({ backgroundColor: '#F56236' });
  });

  it('should set the correct background color when a warn message is provided', () => {
    const { sut } = makeSut({ data: createMessage(Priority.Warn) });
    expect(sut.getByTestId('message-card')).toHaveStyle({ backgroundColor: '#FCE788' });
  });

  it('should set the correct background color when a info message is provided', () => {
    const { sut } = makeSut({ data: createMessage(Priority.Info) });
    expect(sut.getByTestId('message-card')).toHaveStyle({ backgroundColor: '#88FCA3' });
  });

  it('should call onClear when clear button is clicked', () => {
    const onClear = jest.fn();
    const { sut } = makeSut({ data: createMessage(Priority.Info), onClear });
    const clearButton = sut.getByRole('button');
    fireEvent.click(clearButton);
    expect(onClear).toHaveBeenCalledTimes(1);
  });
});
