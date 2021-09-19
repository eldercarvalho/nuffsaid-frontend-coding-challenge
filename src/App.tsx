import React, { useState, useEffect } from 'react';
import Card, { CardProps } from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

import { Grid } from '@material-ui/core';
import generateMessage, { Message, Priority } from './Api';

const Container = styled.main({
  maxWidth: '1000px',
  margin: '0 auto',
});

const CardButton = styled(Button)({
  textTransform: 'none',
});

interface ColoredCardProps {
  backgroundColor: string;
}

const App: React.FC<{}> = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const cleanUp = generateMessage((message: Message) => {
      setMessages((oldMessages) => [...oldMessages, message]);
    });
    return cleanUp;
  }, [setMessages]);

  return (
    <Container>
      <Grid container>
        <Grid item xs>
          {messages
            ?.filter((message) => message.priority === Priority.Error)
            .map?.((msg) => (
              <Card key={msg?.message}>
                <CardContent>{msg?.message}</CardContent>
                <CardActions>
                  <CardButton variant="text" size="small">
                    Clear
                  </CardButton>
                </CardActions>
              </Card>
            ))}
        </Grid>
        <Grid item>
          {messages
            ?.filter((message) => message.priority === Priority.Info)
            .map?.((msg) => (
              <Card key={msg?.message}>
                <CardContent>{msg?.message}</CardContent>
                <CardActions>
                  <CardButton variant="text" size="small">
                    Clear
                  </CardButton>
                </CardActions>
              </Card>
            ))}
        </Grid>
        <Grid item>
          {messages
            ?.filter((message) => message.priority === Priority.Warn)
            .map?.((msg) => (
              <Card key={msg?.message}>
                <CardContent>{msg?.message}</CardContent>
                <CardActions>
                  <CardButton variant="text" size="small">
                    Clear
                  </CardButton>
                </CardActions>
              </Card>
            ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
