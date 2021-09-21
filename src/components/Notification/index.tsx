import { useState } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

type NotificationsProps = {
  id: string;
  message: string;
  onClose(notificationId: string): void;
};

const Notification: React.FC<NotificationsProps> = ({ id, message, onClose }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Snackbar
      open={isOpen}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      message={<span>{message}</span>}
      action={[
        <Button variant="text" color="inherit" onClick={() => setIsOpen(false)}>
          Close
        </Button>,
      ]}
      onClose={() => setIsOpen(false)}
      onExited={() => onClose(id)}
      autoHideDuration={2000}
    />
  );
};

export default Notification;
