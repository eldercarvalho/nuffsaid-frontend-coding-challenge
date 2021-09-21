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

  const handleClose = (_: React.SyntheticEvent<any, Event>, reason: string) => {
    if (reason !== 'clickaway') {
      setIsOpen(false);
    }
  };

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
      onClose={handleClose}
      onExited={() => onClose(id)}
      autoHideDuration={2000}
      disableWindowBlurListener
    />
  );
};

export default Notification;
