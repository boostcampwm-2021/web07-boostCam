import { atom } from 'recoil';
import { io } from 'socket.io-client';

const socketState = atom({
  key: 'socket',
  default: io(),
});

export default socketState;
