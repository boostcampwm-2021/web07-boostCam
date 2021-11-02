import React from 'react';
import { io } from 'socket.io-client';
import ChattingTab from './components/ChattingTab';
import UserListTab from './components/UserListTab';

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
    <div className="App">
      <UserListTab socket={socket} />
      <ChattingTab socket={socket} />
    </div>
  );
}

export default App;
