import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { MainStoreContext } from '../MainStore';
import { MessageData, MessageListInfo, MessageRequestBody } from '../../../types/message';

import { TextareaDiv, MessageTextarea, messageInnerElement, onKeyDownMessageTextarea } from './ContentsSectionCommon';
import { User } from '../../../types/user';
import ChannelEntity from '../../../types/channel';
import UserListModal from './UserListModal';
import NotFoundChannel from './NotFoundChannel';
import { customScroll, flex } from '../../../utils/styledComponentFunc';
import { ToggleStoreContext } from '../ToggleStore';

const Container = styled.div`
  flex: 5 0 0;
  height: 100%;

  background-color: white;

  ${flex('column', 'flex-start')}

  border-right: 1px solid black;
`;

const MessageSectionHeader = styled.div`
  width: 100%;
  flex: 1 1 0;
  max-height: 50px;

  ${flex('row', 'space-between', 'center')}

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

  ${flex('column', 'flex-start', 'flex-start')}

  ${customScroll()};
`;

const MessageItemBlock = styled.div`
  width: 100%;
  ${flex('row', 'flex-start')}
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
  const { selectedChannel, setSelectedMessageData, socket } = useContext(MainStoreContext);
  const { setIsModalOpen, setModalContents } = useContext(ToggleStoreContext);
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
      description: '채널에 참여한 사용자들의 목록입니다.',
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
