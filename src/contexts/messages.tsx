import { createContext, useContext, useEffect, useRef, useState } from 'react';
import generateMessage, { Message } from '@/Api';

type MessagesContextData = {
  currentMessage: Message;
  messages: Message[];
  isIncoming: boolean;
  addMessage(data: Message): void;
  removeMessage(messageId: string): void;
  clearMessages(): void;
  toggleIncomingMessages(): void;
};

const MessagesContext = createContext<MessagesContextData>({} as MessagesContextData);

export const MessagesProvider: React.FC = ({ children }) => {
  const [currentMessage, setCurrentMessage] = useState<Message>({} as Message);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isIncoming, setIsIncoming] = useState(true);
  const cleanUpRef = useRef(() => {});

  useEffect(() => {
    if (isIncoming) {
      cleanUpRef.current = generateMessage((message: Message) => {
        setCurrentMessage(message);
        setMessages((oldMessages) => [...oldMessages, message]);
      });
    } else {
      cleanUpRef.current();
    }

    return () => cleanUpRef.current();
  }, [isIncoming, setMessages]);

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
        messages,
        isIncoming,
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
