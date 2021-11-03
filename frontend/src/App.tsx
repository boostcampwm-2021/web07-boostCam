import React from 'react';
import { io } from 'socket.io-client';
import ChattingTab from './components/ChattingTab';
import CamStore from './components/CamStore';

function App(): JSX.Element {
  const socket = io();

  socket.emit('message');

  return (
    <div className="App">
      <CamStore socket={socket} />
      <ChattingTab socket={socket} />
    </div>
  );
}

export default App;
