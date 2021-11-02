import React, { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import styled from 'styled-components';

type ChattingTabProps = {
  socket: Socket;
  isChattingTabActive: boolean;
};

const Container = styled.div<{ isActive: boolean }>`
  width: 19vw;
  height: 80vh;
  background-color: gray;
  display: ${(props) => (props.isActive ? 'block' : 'none')};
`;

function ChattingTab(props: ChattingTabProps): JSX.Element {
  const [chatLogs, setChatLogs] = useState<string[]>([]);
  const [room, setRoom] = useState<string | null>(null);
  const { socket, isChattingTabActive } = props;

  const sendMessage = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    const { key, currentTarget } = e;
    if (key === 'Enter') {
      if (!room) alert('먼저 방에 참가해주세요!');
      else {
        const msg = currentTarget.value;
        currentTarget.value = '';
        socket.emit('sendMessage', { msg, room });
        setChatLogs((logs) => [...logs, msg]);
      }
    }
  };

  const enterRoom = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    const { key, currentTarget } = e;
    if (key === 'Enter') {
      const { value } = currentTarget;
      if (!value) alert('올바른 방 이름을 입력해주세요!');
      else setRoom(value);
      socket.emit('setRoom', value);
      currentTarget.value = '';
    }
  };

  useEffect(() => {
    socket.on('receiveMessage', (msg: string) => {
      setChatLogs((logs) => [...logs, msg]);
    });
  }, []);

  const currentChatLogs = chatLogs.map((msg: string): JSX.Element => {
    return <div key={msg}>{msg}</div>;
  });

  return (
    <Container isActive={isChattingTabActive}>
      <div>currentRoom : {room}</div>
      <input type="text" placeholder="참가할 방을 선택하세요" onKeyDown={enterRoom} />
      <div>{currentChatLogs}</div>
      <input type="text" placeholder="내용을 입력하세요." onKeyDown={sendMessage} />
    </Container>
  );
}

export default ChattingTab;
