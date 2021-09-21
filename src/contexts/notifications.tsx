import { createContext, useContext, useState } from 'react';
import Notification from '@/components/Notification';

type NotificationType = {
  id: string;
  message: string;
};

type NotificationsContextData = {
  notifications: NotificationType[];
  addNotification(data: NotificationType): void;
};

const NotificationsContext = createContext<NotificationsContextData>(
  {} as NotificationsContextData,
);

export const NotificationsProvider: React.FC = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  const addNotification = (data: NotificationType) => {
    setNotifications([...notifications, data]);
  };

  const removeNotification = (notificationId: string) => {
    setNotifications((oldNotifications) =>
      oldNotifications.filter((notification) => notification.id !== notificationId),
    );
  };

  return (
    <NotificationsContext.Provider value={{ notifications, addNotification }}>
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          id={notification.id}
          message={notification.message}
          onClose={removeNotification}
        />
      ))}
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
