import React, { useEffect, useState, useRef, useContext } from 'react';
import styled from 'styled-components';

import STTScreen from '../STT/STTScreen';
import { ToggleStoreContext } from '../ToggleStore';
import { CamStoreContext } from '../CamStore';
import getCurrentDate from '../../../utils/getCurrentDate';
import { CamMessageInfo, CamRoomInfo } from '../../../types/cam';
import { customScroll, flex } from '../../../utils/styledComponentFunc';

const Container = styled.div<{ isActive: boolean; isMouseOnCamPage: boolean }>`
  height: 90vh;
  background-color: #ffffff;

  transition: right 0.5s, opacity 0.5s;
  position: absolute;
  width: 27vw;
  right: ${(props) => (props.isActive ? '0' : '-30vw')};
  opacity: ${(props) => (props.isActive ? '1' : '0')};
  ${flex('column', 'space-around', 'center')};
`;

const ChatLogs = styled.div`
  width: 100%;
  height: 90%;
  background-color: #ffffff;

  overflow-y: auto;
  ${flex('column', 'flex-start', 'center')};
  ${customScroll()};
`;

const ChatContainer = styled.div<{ isMe: boolean }>`
  width: 90%;
  ${flex('column', 'flex-start')};
  align-items: ${(props) => (props.isMe ? 'flex-end' : 'flex-start')};
`;

const ChatTop = styled.div<{ isMe: boolean }>`
  width: 100%;
  ${flex('row', 'initial', 'center')};
  justify-content: ${(props) => (props.isMe ? 'end' : 'start')};
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
  ${customScroll()};
`;

const TextContainer = styled.div`
  box-sizing: border-box;
  margin: 10px;
  border: 2px solid #999999;
  border-radius: 10px;
  width: -webkit-fill-available;
`;

function ChattingTab(): JSX.Element {
  const { isChattingTabActive, isMouseOnCamPage } = useContext(ToggleStoreContext);
  const { userInfo, setLocalStatus, socket } = useContext(CamStoreContext);
  const [chatLogs, setChatLogs] = useState<CamMessageInfo[]>([]);
  const [nicknameList, setNicknameList] = useState<CamRoomInfo[]>([
    {
      socketId: socket.id,
      userNickname: userInfo.nickname,
    },
  ]);
  const [room] = useState<string | null>('init');
  const chatLogsRef = useRef<HTMLDivElement>(null);

  const sendMessage = (msg: string) => {
    const today = new Date();
    const currentDate = getCurrentDate(today);
    const msgInfo: CamMessageInfo = { msg, room, user: socket.id, date: currentDate };

    socket.emit('sendCamMessage', msgInfo);
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
    socket.on(
      'receiveCamMessage',
      ({ payload, nicknameInfo }: { payload: CamMessageInfo; nicknameInfo: CamRoomInfo[] }) => {
        setChatLogs((logs) => [...logs, payload]);
        setNicknameList(nicknameInfo);
      },
    );
    socket.on('getNicknameList', (nicknameInfo: CamRoomInfo[]) => {
      setNicknameList(nicknameInfo);
    });
  }, []);

  useEffect(() => {
    if (chatLogsRef.current) {
      chatLogsRef.current.scroll({ top: chatLogsRef.current.scrollHeight, behavior: 'smooth' });
    }
  });

  const currentChatLogs = chatLogs.map((data: CamMessageInfo, index: number): JSX.Element => {
    const { msg, date, user } = data;
    const time = `${date.hour}:${date.minutes < 10 ? `0${date.minutes}` : date.minutes}`;
    const isMe = user === socket.id;
    const nickname = nicknameList.find((val) => val.socketId === user)?.userNickname;
    const chatTopChildren = isMe ? (
      <ChatTop isMe={isMe}>
        <ChatDate>{time}</ChatDate>
        <ChatUserName isMe={isMe}>{userInfo.nickname}</ChatUserName>
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
        <STTScreen sendMessage={sendMessage} setLocalStatus={setLocalStatus} />
        <ChatTextarea placeholder="내용을 입력하세요." onKeyDown={handleKeyDown} />
      </TextContainer>
    </Container>
  );
}

export default ChattingTab;
