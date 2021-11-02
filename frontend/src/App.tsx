import React from 'react';
import styled from 'styled-components';
import { io } from 'socket.io-client';

import Cam from './components/Cam/Cam';

const Container = styled.div``;

function App(): JSX.Element {
  const socket = io();
  socket.on('connect', () => {
    console.log('connected!');
  });

  socket.emit('message');

  socket.on('receive', (data) => {
    console.log(data);
  });

  return (
    <Container>
      <Cam socket={socket} />
    </Container>
  );
}

export default App;
