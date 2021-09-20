import React, { useMemo } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import MessageCard from '@/components/MessageCard';

import { useMessages } from '@/contexts/messages';
import { Priority } from '@/Api';
import { Container } from '@/styles/global';
import { CardColumn, Controls } from './styles';

const Home: React.FC = () => {
  const { messages, isReceiving, removeMessage, clearMessages, toggleMessageReceiving } =
    useMessages();
  const errorMessages = useMemo(
    () => messages.filter((message) => message.priority === Priority.Error),
    [messages],
  );
  const warningMessages = useMemo(
    () => messages.filter((message) => message.priority === Priority.Warn),
    [messages],
  );
  const infoMessages = useMemo(
    () => messages.filter((message) => message.priority === Priority.Info),
    [messages],
  );

  return (
    <Container>
      <Controls>
        <Button variant="contained" color="primary" onClick={toggleMessageReceiving}>
          {isReceiving ? 'Stop' : 'Continue'}
        </Button>
        <Button variant="contained" color="primary" onClick={clearMessages}>
          Clear
        </Button>
      </Controls>

      <Grid container spacing={16}>
        <Grid item xs={4}>
          <CardColumn>
            <h2>Error Type 1</h2>
            <p>Count {errorMessages.length}</p>
            {errorMessages.map?.((msg) => (
              <MessageCard
                key={msg.id}
                data={msg}
                onClear={(messageId: string) => removeMessage(messageId)}
              />
            ))}
          </CardColumn>
        </Grid>
        <Grid item xs={4}>
          <CardColumn>
            <h2>Warning Type 2</h2>
            <p>Count {warningMessages.length}</p>
            {warningMessages.map?.((msg) => (
              <MessageCard
                key={msg.id}
                data={msg}
                onClear={(messageId: string) => removeMessage(messageId)}
              />
            ))}
          </CardColumn>
        </Grid>
        <Grid item xs={4}>
          <CardColumn>
            <h2>Info Type 3</h2>
            <p>Count {infoMessages.length}</p>
            {infoMessages.map?.((msg) => (
              <MessageCard
                key={msg.id}
                data={msg}
                onClear={(messageId: string) => removeMessage(messageId)}
              />
            ))}
          </CardColumn>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
