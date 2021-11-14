import React, { useEffect, useState, useRef, useContext } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import socketState from '../../atoms/socket';
import STTScreen from './STT/STTScreen';
import { ToggleStoreContext } from './ToggleStore';
import { CamStoreContext } from './CamStore';

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
  width: 100%;
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
  width: 100%;
  max-height: 100px;
  min-height: 80px;
  border: none;
  outline: none;
  resize: none;
  background: none;

  font-size: 16px;
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

const TextContainer = styled.div`
  box-sizing: border-box;
  margin: 10px;
  border: 2px solid #999999;
  border-radius: 10px;
  width: -webkit-fill-available;
`;

type CurrentDate = {
  year: number;
  month: number;
  date: number;
  hour: number;
  minutes: number;
};

type MessageInfo = {
  msg: string;
  room: string | null;
  user: string;
  date: CurrentDate;
};

type RoomInfo = {
  socketId: string;
  userNickname: string;
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
  const { userInfo } = useContext(CamStoreContext);
  const socket = useRecoilValue(socketState);
  const [chatLogs, setChatLogs] = useState<MessageInfo[]>([]);
  const [nicknameList, setNicknameList] = useState<RoomInfo[]>([
    {
      socketId: socket.id,
      userNickname: userInfo.nickname,
    },
  ]);
  const [room] = useState<string | null>('init');
  const chatLogsRef = useRef<HTMLDivElement>(null);

  const sendMessage = (msg: string) => {
    const currentDate = getCurrentDate();
    const msgInfo: MessageInfo = { msg, room, user: socket.id, date: currentDate };

    socket.emit('sendMessage', msgInfo);
    setChatLogs((logs) => [...logs, msgInfo]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    const { key, currentTarget, shiftKey } = e;
    const msg = currentTarget.value.trim();

    if (!shiftKey && key === 'Enter') {
      e.preventDefault();
      if (!msg.length) currentTarget.value = '';
      else {
        sendMessage(msg);
        currentTarget.value = '';
      }
    }
  };

  useEffect(() => {
    socket.on('receiveMessage', ({ payload, nicknameInfo }: { payload: MessageInfo; nicknameInfo: RoomInfo[] }) => {
      setChatLogs((logs) => [...logs, payload]);
      setNicknameList(nicknameInfo);
    });
    console.log(`nickname : ${userInfo.nickname}`);
  }, []);

  useEffect(() => {
    if (chatLogsRef.current) {
      chatLogsRef.current.scroll({ top: chatLogsRef.current.scrollHeight, behavior: 'smooth' });
    }
  });

  const currentChatLogs = chatLogs.map((data: MessageInfo, index: number): JSX.Element => {
    const { msg, date, user } = data;
    const time = `${date.hour}:${date.minutes < 10 ? `0${date.minutes}` : date.minutes}`;
    const isMe = user === socket.id;
    const nickname = nicknameList.find((val) => val.socketId === user)?.userNickname;
    const chatTopChildren = isMe ? (
      <ChatTop isMe={isMe}>
        <ChatDate>{time}</ChatDate>
        <ChatUserName isMe={isMe}>{nickname}</ChatUserName>
      </ChatTop>
    ) : (
      <ChatTop isMe={isMe}>
        <ChatUserName isMe={isMe}>{nickname}</ChatUserName>
        <ChatDate>{time}</ChatDate>
      </ChatTop>
    );

    return (
      <ChatContainer key={`${msg + index}`} isMe={isMe}>
        {chatTopChildren}
        <ChatMessageBox>{msg}</ChatMessageBox>
      </ChatContainer>
    );
  });

  return (
    <Container isActive={isChattingTabActive} isMouseOnCamPage={isMouseOnCamPage}>
      <ChatLogs ref={chatLogsRef}>{currentChatLogs}</ChatLogs>
      <TextContainer>
        {' '}
        <STTScreen sendMessage={sendMessage} />
        <ChatTextarea placeholder="내용을 입력하세요." onKeyDown={handleKeyDown} />
      </TextContainer>
    </Container>
  );
}

export default ChattingTab;
