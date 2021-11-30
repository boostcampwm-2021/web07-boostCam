import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { MainStoreContext } from '../MainStore';
import { MessageData, MessageListInfo, MessageRequestBody } from '../../../types/message';
import noInfoImg from '../../../assets/hmm.gif';

import {
  MessageItemIcon,
  MessageItem,
  MessageItemHeader,
  MessageSender,
  MessageTimelog,
  MessageContents,
  TextareaDiv,
  MessageTextarea,
} from './ContentsSectionStyle';
import { User } from '../../../types/user';
import ChannelEntity from '../../../types/channel';
import UserListModal from './UserListModal';
import getCurrentDate from '../../../utils/getCurrentDate';

const Container = styled.div`
  flex: 5 0 0;
  height: 100%;

  background-color: white;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-right: 1px solid black;
`;

const MessageSectionHeader = styled.div`
  width: 100%;
  flex: 1 1 0;
  max-height: 50px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border-bottom: 1px solid gray;
`;

const ChannelName = styled.div`
  margin-left: 15px;
  padding: 8px 12px;
  border-radius: 10px;

  cursor: pointer;

  &:hover {
    background-color: #f0e7e7;
  }
`;

const ChannelUserButton = styled.div`
  margin-right: 15px;
  padding: 3px 5px;
  border: 1px solid gray;
  border-radius: 10px;

  cursor: pointer;

  &:hover {
    background-color: #f0e7e7;
  }
`;

const MessageSectionBody = styled.div`
  width: 100%;
  flex: 5 1 0;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

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

const MessageItemBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  &:hover {
    background-color: #f0e7e7;
  }
`;

const NoChannelInfoDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NoChannelInfoDescription = styled.span`
  margin-top: 20px;
  font-size: 25px;
`;

const NoInfoImg = styled.img`
  width: 150px;
  height: 150px;
  margin-bottom: 25px;
`;

const ResetButton = styled.button`
  width: 250px;
  height: 50px;
  background: none;
  padding: 15px 10px;
  margin: 15px 0px 0px 0px;
  border: 0;
  outline: 0;
  text-align: center;
  vertical-align: middle;
  border-radius: 10px;
  background-color: #26a9ca;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: #2dc2e6;
    transition: all 0.3s;
  }
`;

type MessageSectionProps = {
  messageList: MessageListInfo;
  setIsThreadOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userList: User[];
  channelInfo: ChannelEntity | undefined;
};

function MessageSection(props: MessageSectionProps): JSX.Element {
  const { selectedChannel, setSelectedMessageData, getServerChannelList, setIsModalOpen, setModalContents, socket } =
    useContext(MainStoreContext);
  const { messageList, setIsThreadOpen, userList, channelInfo } = props;
  const { messageData } = messageList;
  const textareaDivRef = useRef<HTMLDivElement>(null);
  const messageSectionBodyRef = useRef<HTMLDivElement>(null);

  const sendMessage = async (contents: string) => {
    const requestBody: MessageRequestBody = {
      channelId: selectedChannel,
      contents,
    };
    socket.emit('sendMessage', requestBody);
  };

  const onKeyDownMessageTextarea = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const { key, currentTarget, shiftKey } = e;
    const msg = currentTarget.value.trim();
    const divRef = textareaDivRef.current;

    currentTarget.style.height = '15px';
    currentTarget.style.height = `${currentTarget.scrollHeight - 15}px`;
    if (divRef) {
      divRef.style.height = `105px`;
      divRef.style.height = `${90 + currentTarget.scrollHeight - 27}px`;
    }

    if (!shiftKey && key === 'Enter') {
      e.preventDefault();
      if (!msg.length) currentTarget.value = '';
      else {
        sendMessage(currentTarget.value);
        currentTarget.value = '';
      }
      currentTarget.style.height = '21px';
      if (divRef) divRef.style.height = `105px`;
    }
  };

  const onClickMessageItemBlock = (data: MessageData) => {
    setSelectedMessageData(data);
    setIsThreadOpen(true);
  };

  const onClickChannelUserButton = () => {
    setModalContents(<UserListModal userList={userList} />);
    setIsModalOpen(true);
  };

  const onClickChannelListResetButton = () => {
    getServerChannelList();
  };

  const buildMessageItemList = () => {
    return messageData.map((val: MessageData): JSX.Element => {
      const { id, contents, createdAt, sender } = val;
      const { nickname, profile } = sender;
      const dateObj = getCurrentDate(new Date(createdAt));
      const date = `${dateObj.year}-${dateObj.month}-${dateObj.date} ${dateObj.hour}:${dateObj.minutes}`;
      return (
        <MessageItemBlock key={id} onClick={() => onClickMessageItemBlock(val)}>
          <MessageItemIcon imgUrl={profile} />
          <MessageItem>
            <MessageItemHeader>
              <MessageSender> {nickname} </MessageSender>
              <MessageTimelog>{date}</MessageTimelog>
            </MessageItemHeader>
            <MessageContents>{contents}</MessageContents>
          </MessageItem>
        </MessageItemBlock>
      );
    });
  };

  useEffect(() => {
    if (messageSectionBodyRef.current) {
      messageSectionBodyRef.current.scroll({ top: messageSectionBodyRef.current.scrollHeight, behavior: 'smooth' });
    }
  });

  const MessageItemList = buildMessageItemList();

  return (
    <Container>
      {!channelInfo ? (
        <NoChannelInfoDiv>
          <NoInfoImg src={noInfoImg} />
          <NoChannelInfoDescription>채널이 존재하지 않습니다...</NoChannelInfoDescription>
          <ResetButton onClick={onClickChannelListResetButton}>새고로침</ResetButton>
        </NoChannelInfoDiv>
      ) : (
        <>
          <MessageSectionHeader>
            <ChannelName># {channelInfo && channelInfo.name}</ChannelName>
            <ChannelUserButton onClick={onClickChannelUserButton}>
              Users {userList && userList.length}
            </ChannelUserButton>
          </MessageSectionHeader>
          <MessageSectionBody ref={messageSectionBodyRef}>{MessageItemList}</MessageSectionBody>
          <TextareaDiv ref={textareaDivRef}>
            <MessageTextarea onKeyDown={onKeyDownMessageTextarea} />
          </TextareaDiv>
        </>
      )}
    </Container>
  );
}

export default MessageSection;
