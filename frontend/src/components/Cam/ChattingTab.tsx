import React, { useEffect, useState, useRef, useContext } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import socketState from '../../atoms/socket';
import useSTT from '../../hooks/useSTT';
import { ToggleStoreContext } from './ToggleStore';

const Container = styled.div<{ isActive: boolean; isMouseOnCamPage: boolean }>`
  width: 27vw;
  height: ${(props) => (props.isMouseOnCamPage ? '90vh' : '98vh')};
  background-color: #ffffff;
  display: flex;
  ${(props) =>
    props.isActive
      ? `
    position: relative;
    transition: all 0.5s;
  `
      : ` 
      opacity:0;
      visibility:hidden;
      position: absolute;
      right:0px;
      transition: opacity 0.5s, visibility 0.5s;
      `};

  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const ChatLogs = styled.div`
  width: 90%;
  height: 90%;
  background-color: #ffffff;

  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #999999;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: #cccccc;
    border-radius: 10px;
  }
`;

const ChatContainer = styled.div<{ isMe: boolean }>`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: ${(props) => (props.isMe ? 'flex-end' : 'flex-start')};
`;

const ChatTop = styled.div<{ isMe: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: ${(props) => (props.isMe ? 'end' : 'start')};
  align-items: center;
  margin-top: 5px;
`;

const ChatUserName = styled.div<{ isMe: boolean }>`
  font-weight: 500;
  font-size: 18px;
  margin-${(props) => (props.isMe ? 'left' : 'right')}:10px;
`;

const ChatDate = styled.div`
  color: #333333;
`;

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
  height: 80px;
  border: none;
  outline: none;
  resize: none;

  line-height: 22px;
  margin: 10px 20px;

  font-size: 16px;
  border-top: 2px solid #999999;
  padding: 10px 8px;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    width: 10px;
    padding: 0px 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #999999;
    border-radius: 10px;
    padding: 0px 8px;
  }
  &::-webkit-scrollbar-track {
    background-color: #cccccc;
    border-radius: 10px;
    padding: 0px 8px;
  }
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

function ChattingTab(): JSX.Element {
  const { isChattingTabActive, isMouseOnCamPage } = useContext(ToggleStoreContext);

  const [chatLogs, setChatLogs] = useState<MsgInfo[]>([]);
  const [room] = useState<string | null>('init');
  const chatLogsRef = useRef<HTMLDivElement>(null);
  const socket = useRecoilValue(socketState);
  const lastResult = useSTT();

  const sendMessage = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    const { key, currentTarget, shiftKey } = e;
    const msg = currentTarget.value.trim();

    if (!shiftKey && key === 'Enter') {
      e.preventDefault();
      if (!msg.length) currentTarget.value = '';
      else {
        const currentDate = getCurrentDate();
        const msgInfo: MsgInfo = { msg, room, user: socket.id, date: currentDate };
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

  useEffect(() => {
    const currentDate = getCurrentDate();
    if (lastResult.isFinal) {
      const msgInfo: MsgInfo = { msg: lastResult.text, room, user: socket.id, date: currentDate };
      socket.emit('sendMessage', msgInfo);
      setChatLogs((logs) => [...logs, msgInfo]);
    }
  }, [lastResult]);

  const currentChatLogs = chatLogs.map((data: MsgInfo): JSX.Element => {
    const { msg, date, user } = data;
    const time = `${date.hour}:${date.minutes < 10 ? `0${date.minutes}` : date.minutes}`;
    const isMe = user === socket.id;
    const chatTopChildren = isMe ? (
      <ChatTop isMe={isMe}>
        <ChatDate>{time}</ChatDate>
        <ChatUserName isMe={isMe}>{user.substring(0, 5)}</ChatUserName>
      </ChatTop>
    ) : (
      <ChatTop isMe={isMe}>
        <ChatUserName isMe={isMe}>{user.substring(0, 5)}</ChatUserName>
        <ChatDate>{time}</ChatDate>
      </ChatTop>
    );

    return (
      <ChatContainer key={`${msg + time}`} isMe={isMe}>
        {chatTopChildren}
        <ChatMessageBox>{msg}</ChatMessageBox>
      </ChatContainer>
    );
  });

  return (
    <Container isActive={isChattingTabActive} isMouseOnCamPage={isMouseOnCamPage}>
      <ChatLogs ref={chatLogsRef}>{currentChatLogs}</ChatLogs>
      <ChatTextarea placeholder="내용을 입력하세요." onKeyDown={sendMessage} />
    </Container>
  );
}

export default ChattingTab;
