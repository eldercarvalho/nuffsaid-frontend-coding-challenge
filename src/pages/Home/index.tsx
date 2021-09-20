import React, { useMemo } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import MessageCard from '@/components/MessageCard';

import { useMessages } from '@/contexts/messages';
import { Priority } from '@/Api';
import { CardColumn } from './styles';

const Container = styled.main({
  maxWidth: '1200px',
  margin: '0 auto',
});

export const Home: React.FC = () => {
  const { messages, removeMessage } = useMessages();
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
      {/* <Box>
        <Button>Stop</Button>
      </Box> */}
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
            <h2>Warning Type 1</h2>
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
