import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { MainStoreContext } from '../MainStore';
import { MessageData, MessageRequestBody } from '../../../types/messags';
import fetchData from '../../../utils/fetchMethods';

const Container = styled.div`
  width: 100%;
  height: 100%;

  background-color: white;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
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

const MessageItemIcon = styled.div<{ imgUrl: string }>`
  width: 36px;
  height: 36px;
  margin: 10px;
  background-image: url(${(props) => props.imgUrl});
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 8px;
`;

const MessageItem = styled.div`
  width: 90%;
  padding: 8px 0px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const MessageItemHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const MessageSender = styled.span`
  font-weight: 600;
  font-size: 15px;
`;

const MessageTimelog = styled.span`
  font-size: 12px;
  margin-left: 15px;
`;

const MessageContents = styled.span`
  font-size: 15px;
`;

const TextareaDiv = styled.div`
  min-height: 105px;
  max-height: 250px;
  background-color: #ece9e9;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const MessageTextarea = styled.textarea`
  width: 90%;
  height: 22px;
  max-height: 200px;
  border: none;
  outline: none;
  resize: none;
  background: none;

  font-size: 15px;

  padding: 10px;
  border: 1px solid gray;
  border-radius: 5px;

  background-color: white;

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

function MessageSection(): JSX.Element {
  const { selectedChannel } = useContext(MainStoreContext);
  const [messageList, setMessageList] = useState<MessageData[]>([]);
  const textDivRef = useRef<HTMLDivElement>(null);
  const tmpChannelName = '# ChannelName';

  const getMessageList = async () => {
    const responseData = await fetchData<null, MessageData[]>('GET', `/api/messages?channelId=${selectedChannel}`);

    if (responseData) {
      responseData.sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10));
      setMessageList(responseData);
    }
  };

  const sendMessage = async (contents: string) => {
    const requestBody: MessageRequestBody = {
      channelId: selectedChannel,
      contents,
    };
    await fetchData<MessageRequestBody, MessageData>('POST', '/api/messages', requestBody);
    getMessageList();
  };

  const onKeyDownMessageTextarea = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const { key, currentTarget, shiftKey } = e;
    const msg = currentTarget.value.trim();
    const divRef = textDivRef.current;

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

  const MessageItemList = messageList.map((val: MessageData): JSX.Element => {
    const { id, contents, createdAt, sender } = val;
    const { nickname, profile } = sender;
    return (
      <MessageItemBlock key={id}>
        <MessageItemIcon imgUrl={profile} />
        <MessageItem>
          <MessageItemHeader>
            <MessageSender> {nickname} </MessageSender>
            <MessageTimelog>{createdAt}</MessageTimelog>
          </MessageItemHeader>
          <MessageContents>{contents}</MessageContents>
        </MessageItem>
      </MessageItemBlock>
    );
  });

  useEffect(() => {
    getMessageList();
  }, [selectedChannel]);

  return (
    <Container>
      <MessageSectionHeader>
        <ChannelName>{tmpChannelName}</ChannelName>
        <ChannelUserButton>Users 5</ChannelUserButton>
      </MessageSectionHeader>
      <MessageSectionBody>{MessageItemList}</MessageSectionBody>
      <TextareaDiv ref={textDivRef}>
        <MessageTextarea onKeyDown={onKeyDownMessageTextarea} />
      </TextareaDiv>
    </Container>
  );
}

export default MessageSection;
