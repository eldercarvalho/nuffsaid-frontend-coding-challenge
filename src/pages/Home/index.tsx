import React, { useEffect } from 'react';
import { v4 } from 'uuid';
import { useTransition, animated } from 'react-spring';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import MessageCard from '@/components/MessageCard';

import { useMessages } from '@/contexts/messages';
import { useNotifications } from '@/contexts/notifications';
import { Message, Priority } from '@/Api';
import { Container } from '@/styles/global';

import { Controls } from './styles';

const AnimatedGrid = animated(Grid);

const Home: React.FC = () => {
  const { addNotification } = useNotifications();
  const {
    currentMessage,
    isIncoming,
    sortedMessages,
    errorsCount,
    warnsCount,
    infosCount,
    removeMessage,
    clearMessages,
    toggleIncomingMessages,
  } = useMessages();

  const messagesWithTransition = useTransition(sortedMessages, {
    from: { transform: 'translateY(-300px)', opacity: 0 },
    enter: { transform: 'translateY(0)', opacity: 1 },
  });

  useEffect(() => {
    if (currentMessage.priority === Priority.Error) {
      addNotification({
        id: v4(),
        message: currentMessage.message,
      });
    }
  }, [currentMessage]);

  return (
    <Container>
      <Controls>
        <Button variant="contained" color="primary" onClick={toggleIncomingMessages}>
          {isIncoming ? 'Stop' : 'Continue'}
        </Button>
        <Button variant="contained" color="primary" onClick={clearMessages}>
          Clear
        </Button>
      </Controls>

      <Grid container spacing={16}>
        <Grid item xs={4}>
          <h2>Error Type 1</h2>
          <p>Count {errorsCount}</p>
        </Grid>
        <Grid item xs={4}>
          <h2>Warning Type 2</h2>
          <p>Count {warnsCount}</p>
        </Grid>
        <Grid item xs={4}>
          <h2>Info Type 3</h2>
          <p>Count {infosCount}</p>
        </Grid>

        {messagesWithTransition((styles, message, t, index) =>
          message ? (
            <AnimatedGrid key={message.id} item xs={4} style={styles}>
              <MessageCard
                data={message}
                onClear={(messageId: string) => removeMessage(messageId)}
              />
            </AnimatedGrid>
          ) : (
            <Grid key={index} item xs={4} />
          ),
        )}
      </Grid>
    </Container>
  );
};

export default Home;
