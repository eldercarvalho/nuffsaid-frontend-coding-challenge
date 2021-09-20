import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import generateMessage, { Message } from '@/Api';

type MessagesContextData = {
  messages: Message[];
  addMessage(data: Message): void;
  removeMessage(messageId: string): void;
};

const MessagesContext = createContext<MessagesContextData>({} as MessagesContextData);

export const MessagesProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const cleanUp = generateMessage((message: Message) => {
      setMessages((oldMessages) => [...oldMessages, message]);
    });
    return cleanUp;
  }, [setMessages]);

  const addMessage = useCallback((data: Message) => {
    setMessages([...messages, data]);
  }, []);

  const removeMessage = useCallback((messageId: string) => {
    setMessages((oldMessages) => oldMessages.filter((msg) => msg.id !== messageId));
  }, []);

  return (
    <MessagesContext.Provider value={{ messages, addMessage, removeMessage }}>
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
