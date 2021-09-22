import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import generateMessage, { Message, Priority } from '@/Api';

const sortMessages = (arr: Message[]): Message[] => {
  const matrix: Message[][] = [];
  const nextRowPositions = { 0: 0, 1: 0, 2: 0 };

  arr.forEach((item) => {
    const currentRow = matrix[nextRowPositions[item.priority]];

    if (!currentRow) {
      const nextRow = Array(3).fill(null);
      nextRow[item.priority] = item;
      nextRowPositions[item.priority] += 1;
      matrix.push(nextRow);
      return;
    }

    const index = nextRowPositions[item.priority];
    matrix[index][item.priority] = item;
    nextRowPositions[item.priority] += 1;
  });

  return matrix.flatMap((item: Message[]) => item);
};

type MessagesContextData = {
  currentMessage: Message;
  messages: Message[];
  sortedMessages: Message[];
  isIncoming: boolean;
  errorsCount: number;
  warnsCount: number;
  infosCount: number;
  addMessage(data: Message): void;
  removeMessage(messageId: string): void;
  clearMessages(): void;
  toggleIncomingMessages(): void;
};

export const MessagesContext = createContext<MessagesContextData>({} as MessagesContextData);

type MessagesProviderProps = {
  testMessages?: Message[];
};

export const MessagesProvider: React.FC<MessagesProviderProps> = ({ children, testMessages }) => {
  const [currentMessage, setCurrentMessage] = useState<Message>({} as Message);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isIncoming, setIsIncoming] = useState(true);
  const cleanUpRef = useRef(() => {});
  const errorsCount = useMemo(
    () => (messages.filter((msg) => msg.priority === Priority.Error) || []).length,
    [messages],
  );
  const warnsCount = useMemo(
    () => (messages.filter((msg) => msg.priority === Priority.Warn) || []).length,
    [messages],
  );
  const infosCount = useMemo(
    () => (messages.filter((msg) => msg.priority === Priority.Info) || []).length,
    [messages],
  );
  const sortedMessages = useMemo(() => sortMessages(messages), [messages]);

  useEffect(() => {
    if (isIncoming) {
      cleanUpRef.current = generateMessage((message: Message) => {
        setCurrentMessage(message);
        setMessages((oldMessages) => [message, ...oldMessages]);
      });
    } else {
      cleanUpRef.current();
    }

    return () => cleanUpRef.current();
  }, [isIncoming, setMessages]);

  useEffect(() => {
    if (testMessages) {
      setCurrentMessage(testMessages[testMessages.length - 1]);
      setMessages((oldMessages) => [...testMessages, ...oldMessages]);
    }
  }, [testMessages]);

  const addMessage = (data: Message) => {
    setMessages([...messages, data]);
  };

  const removeMessage = (messageId: string) => {
    setMessages((oldMessages) => oldMessages.filter((msg) => msg.id !== messageId));
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const toggleIncomingMessages = () => {
    setIsIncoming((oldValue) => !oldValue);
  };

  return (
    <MessagesContext.Provider
      value={{
        currentMessage,
        sortedMessages,
        messages,
        isIncoming,
        errorsCount,
        infosCount,
        warnsCount,
        addMessage,
        removeMessage,
        clearMessages,
        toggleIncomingMessages,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessages = (): MessagesContextData => {
  const context = useContext(MessagesContext);

  if (!context) {
    throw new Error('This hook should be used within MessagesProvider');
  }

  return context;
};
