import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

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
  const [message, setMessage] = useState<Notification>({} as Notification);
  const [isSnackbarOpened, setIsSnackbarOpened] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (notifications.length > 0) {
      setMessage(notifications[notifications.length - 1]);
      setIsSnackbarOpened(true);
    }
  }, [notifications]);

  const addNotification = useCallback((data: Notification) => {
    setNotifications([...notifications, data]);
  }, []);

  return (
    <NotificationsContext.Provider value={{ notifications, addNotification }}>
      <Snackbar
        color="error"
        open={isSnackbarOpened}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        message={<span>{message.message}</span>}
        action={[
          <Button variant="text" color="inherit" onClick={() => setIsSnackbarOpened(false)}>
            Close
          </Button>,
        ]}
        onClose={() => setIsSnackbarOpened(false)}
        autoHideDuration={2000}
      />
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
