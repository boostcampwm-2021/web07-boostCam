import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { MainStoreContext } from '../MainStore';
import { MessageData, MessageListInfo, MessageRequestBody } from '../../../types/message';

import { TextareaDiv, MessageTextarea, messageInnerElement, onKeyDownMessageTextarea } from './ContentsSectionCommon';
import { User } from '../../../types/user';
import ChannelEntity from '../../../types/channel';
import UserListModal from './UserListModal';
import NotFoundChannel from './NotFoundChannel';

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

type MessageSectionProps = {
  messageList: MessageListInfo;
  setIsThreadOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userList: User[];
  channelInfo: ChannelEntity | undefined;
};

function MessageSection(props: MessageSectionProps): JSX.Element {
  const { selectedChannel, setSelectedMessageData, setIsModalOpen, setModalContents, socket } =
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

  const onClickMessageItemBlock = (data: MessageData) => {
    setSelectedMessageData(data);
    setIsThreadOpen(true);
  };

  const onClickChannelUserButton = () => {
    setModalContents({
      contents: <UserListModal userList={userList} />,
      title: '사용자 목록',
      description: '채널에 참여한 사용자들의 목록을 확인할 수 있습니다.',
      height: '60%',
      minHeight: '450px',
    });
    setIsModalOpen(true);
  };

  const buildMessageItemList = () => {
    return messageData.map((val: MessageData): JSX.Element => {
      const { id } = val;
      return (
        <MessageItemBlock key={id} onClick={() => onClickMessageItemBlock(val)}>
          {messageInnerElement(val)}
        </MessageItemBlock>
      );
    });
  };

  useEffect(() => {
    if (messageSectionBodyRef.current) {
      messageSectionBodyRef.current.scroll({ top: messageSectionBodyRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messageList]);

  const MessageItemList = buildMessageItemList();

  return (
    <Container>
      {!channelInfo ? (
        <NotFoundChannel />
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
            <MessageTextarea onKeyDown={(e) => onKeyDownMessageTextarea(e, textareaDivRef, sendMessage)} />
          </TextareaDiv>
        </>
      )}
    </Container>
  );
}

export default MessageSection;
