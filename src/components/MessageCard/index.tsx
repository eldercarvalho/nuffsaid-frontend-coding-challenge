import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { Message } from '@/Api';

const CardButton = styled(Button)({
  textTransform: 'none',
});

const CardActionsWithAlignment = styled(CardActions)({
  justifyContent: 'flex-end',
});

const messageColors = {
  0: '#F56236',
  1: '#FCE788',
  2: '#88FCA3',
};

type MessageCardProps = {
  data: Message;
  onClear(message: string): void;
};

const MessageCard: React.FC<MessageCardProps> = ({ data, onClear }) => (
  <Card style={{ backgroundColor: messageColors[data.priority] }}>
    <CardContent>{data.message}</CardContent>
    <CardActionsWithAlignment>
      <CardButton variant="text" size="small" onClick={() => onClear(data.id)}>
        Clear
      </CardButton>
    </CardActionsWithAlignment>
  </Card>
);

export default MessageCard;
