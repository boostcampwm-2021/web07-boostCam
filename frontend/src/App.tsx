import React from 'react';
import './App.css';
import { io } from 'socket.io-client';
import Screen from './components/Screen';

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
      <Screen />
    </div>
  );
}

export default App;
