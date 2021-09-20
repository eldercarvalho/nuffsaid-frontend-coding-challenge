import { createContext, useCallback, useContext, useState } from 'react';

type Notification = {
  id: string;
  message: string;
};

type NotificationsContextData = {
  notifications: Notification[];
  addNotification(data: Notification): void;
};

const NotificationsContext = createContext<NotificationsContextData>(
  {} as NotificationsContextData,
);

export const NotificationsProvider: React.FC = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((data: Notification) => {
    setNotifications([...notifications, data]);
  }, []);

  return (
    <NotificationsContext.Provider value={{ notifications, addNotification }}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = (): NotificationsContextData => {
  const context = useContext(NotificationsContext);

  if (!context) {
    throw new Error('This hook should be used within NotificationsProvider');
  }

  return context;
};
