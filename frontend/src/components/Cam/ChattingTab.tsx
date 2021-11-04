import React, { useEffect, useState, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import socketState from '../../atoms/socket';

type ChattingTabProps = {
  isChattingTabActive: boolean;
};

const Container = styled.div<{ isActive: boolean }>`
  width: 18vw;
  height: 90vh;
  background-color: #c4c4c4;
  display: ${(props) => (props.isActive ? 'flex' : 'none')};

  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const ChatLogs = styled.div`
  width: 90%;
  height: 90%;
  background-color: gray;

  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const ChatMessageBox = styled.div`
  width: 90%;

  word-break: break-all;

  background-color: skyblue;
  margin: 5px 0;
  padding: 3px 5px;
  border-radius: 10px;
  box-sizing: border-box;
`;

const ChatInput = styled.input`
  width: 90%;
  border: none;
  outline: none;

  font-size: 20px;
  border: 2px solid gray;
  border-radius: 10px;
  padding: 5px 8px;
  box-sizing: border-box;
`;

function ChattingTab(props: ChattingTabProps): JSX.Element {
  const { isChattingTabActive } = props;

  const [chatLogs, setChatLogs] = useState<string[]>([]);
  const [room, setRoom] = useState<string | null>('init');
  const chatLogsRef = useRef<HTMLDivElement>(null);
  const socket = useRecoilValue(socketState);

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

  useEffect(() => {
    socket.on('receiveMessage', (msg: string) => {
      setChatLogs((logs) => [...logs, msg]);
    });
  }, []);

  useEffect(() => {
    if (chatLogsRef.current) {
      chatLogsRef.current.scroll({ top: chatLogsRef.current.scrollHeight, behavior: 'smooth' });
    }
  });

  const currentChatLogs = chatLogs.map((msg: string, idx: number): JSX.Element => {
    return <ChatMessageBox key={`${msg + idx}`}>{msg}</ChatMessageBox>;
  });

  return (
    <Container isActive={isChattingTabActive}>
      <ChatLogs ref={chatLogsRef}>{currentChatLogs}</ChatLogs>
      <ChatInput type="text" placeholder="내용을 입력하세요." onKeyDown={sendMessage} />
    </Container>
  );
}

export default ChattingTab;
