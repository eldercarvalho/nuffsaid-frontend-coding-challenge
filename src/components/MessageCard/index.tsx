import { memo } from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { Theme, withTheme } from '@material-ui/core/styles';

import { Message } from '@/Api';

const CardButton = styled(Button)`
  text-transform: none;

  span {
    text-transform: none;
  }
`;

const CardActionsWithAlignment = styled(CardActions)({
  justifyContent: 'flex-end',
});

type MessageCardProps = {
  data: Message;
  theme: Theme;
  onClear(message: string): void;
};

const MessageCard: React.FC<MessageCardProps> = ({ data, onClear, ...rest }) => {
  const messageColors = {
    0: rest.theme.palette.error.main,
    1: rest.theme.palette.secondary.main,
    2: rest.theme.palette.primary.main,
  };

  return (
    <Card className="message-card" style={{ backgroundColor: messageColors[data.priority] }}>
      <CardContent>{data.message}</CardContent>
      <CardActionsWithAlignment>
        <CardButton variant="text" size="small" onClick={() => onClear(data.id)}>
          Clear
        </CardButton>
      </CardActionsWithAlignment>
    </Card>
  );
};

export default memo(withTheme()(MessageCard));
