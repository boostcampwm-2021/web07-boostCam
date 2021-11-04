import React, { useEffect, useState, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import socketState from '../../atoms/socket';

type ChattingTabProps = {
  isChattingTabActive: boolean;
};

const Container = styled.div<{ isActive: boolean }>`
  width: 27vw;
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

const ChatContainer = styled.div<{ isMe: boolean }>`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: ${(props) => (props.isMe ? 'flex-end' : 'flex-start')};
`;

const ChatTop = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: 5px;
`;

const ChatUserName = styled.div``;

const ChatDate = styled.div``;

const ChatMessageBox = styled.span`
  max-width: 90%;

  word-break: break-all;
  white-space: pre-wrap;
  background-color: skyblue;
  margin: 5px 0;
  padding: 5px 10px;
  border-radius: 10px;
  box-sizing: border-box;
`;

const ChatTextarea = styled.textarea`
  width: 90%;
  max-height: 100px;
  height: 50px;
  border: none;
  outline: none;
  resize: none;

  line-height: 15px;

  margin-top: 10px;

  font-size: 12px;
  border: 2px solid gray;
  border-radius: 10px;
  padding: 5px 8px;
  box-sizing: border-box;
`;

type CurrentDate = {
  year: number;
  month: number;
  date: number;
  hour: number;
  minutes: number;
};

type MsgInfo = {
  msg: string;
  room: string | null;
  user: string;
  date: CurrentDate;
};

const getCurrentDate = (): CurrentDate => {
  const today: Date = new Date();
  return {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    date: today.getDate(),
    hour: today.getHours(),
    minutes: today.getMinutes(),
  };
};

function ChattingTab(props: ChattingTabProps): JSX.Element {
  const { isChattingTabActive } = props;

  const [chatLogs, setChatLogs] = useState<MsgInfo[]>([]);
  const [room, setRoom] = useState<string | null>('init');
  const chatLogsRef = useRef<HTMLDivElement>(null);
  const socket = useRecoilValue(socketState);

  const sendMessage = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    const { key, currentTarget, shiftKey } = e;
    const msg = currentTarget.value.trim();
    const currentHeight = currentTarget.scrollHeight;
    currentTarget.style.height = currentHeight > 50 ? `${currentTarget.scrollHeight}px` : '50px';

    if (!shiftKey && key === 'Enter') {
      e.preventDefault();
      if (!msg.length) currentTarget.value = '';
      else {
        const currentDate = getCurrentDate();
        const msgInfo: MsgInfo = { msg, room, user: socket.id, date: currentDate };
        currentTarget.style.height = '50px';
        currentTarget.value = '';
        socket.emit('sendMessage', msgInfo);
        setChatLogs((logs) => [...logs, msgInfo]);
      }
    }
  };

  useEffect(() => {
    socket.on('receiveMessage', (data: MsgInfo) => {
      setChatLogs((logs) => [...logs, data]);
    });
  }, []);

  useEffect(() => {
    if (chatLogsRef.current) {
      chatLogsRef.current.scroll({ top: chatLogsRef.current.scrollHeight, behavior: 'smooth' });
    }
  });

  const currentChatLogs = chatLogs.map((data: MsgInfo): JSX.Element => {
    const { msg, date, user } = data;
    const time = `${date.hour}:${date.minutes < 10 ? `0${date.minutes}` : date.minutes}`;
    const isMe = user === socket.id;
    return (
      <ChatContainer key={`${msg + time}`} isMe={isMe}>
        <ChatTop>
          <ChatUserName>{user.substring(0, 5)}</ChatUserName>
          <ChatDate>{time}</ChatDate>
        </ChatTop>
        <ChatMessageBox>{msg}</ChatMessageBox>
      </ChatContainer>
    );
  });

  return (
    <Container isActive={isChattingTabActive}>
      <ChatLogs ref={chatLogsRef}>{currentChatLogs}</ChatLogs>
      <ChatTextarea placeholder="내용을 입력하세요." onKeyDown={sendMessage} />
    </Container>
  );
}

export default ChattingTab;
