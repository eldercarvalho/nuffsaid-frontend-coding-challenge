import { createContext, useContext, useEffect, useRef, useState } from 'react';
import generateMessage, { Message } from '@/Api';

type MessagesContextData = {
  messages: Message[];
  isReceiving: boolean;
  addMessage(data: Message): void;
  removeMessage(messageId: string): void;
  clearMessages(): void;
  toggleMessageReceiving(): void;
};

const MessagesContext = createContext<MessagesContextData>({} as MessagesContextData);

export const MessagesProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isReceiving, setIsReceiving] = useState(true);
  const cleanUpRef = useRef(() => {});

  useEffect(() => {
    if (isReceiving) {
      cleanUpRef.current = generateMessage((message: Message) => {
        setMessages((oldMessages) => [...oldMessages, message]);
      });
    } else {
      cleanUpRef.current();
    }

    return () => cleanUpRef.current();
  }, [setMessages, isReceiving]);

  const addMessage = (data: Message) => {
    setMessages([...messages, data]);
  };

  const removeMessage = (messageId: string) => {
    setMessages((oldMessages) => oldMessages.filter((msg) => msg.id !== messageId));
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const toggleMessageReceiving = () => {
    setIsReceiving((oldValue) => !oldValue);
  };

  return (
    <MessagesContext.Provider
      value={{
        messages,
        isReceiving,
        addMessage,
        removeMessage,
        clearMessages,
        toggleMessageReceiving,
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
