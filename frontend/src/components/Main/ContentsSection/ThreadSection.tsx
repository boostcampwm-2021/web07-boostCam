import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { CommentData, CommentRequestBody } from '../../../types/comment';
import { MessageData } from '../../../types/message';
import fetchData from '../../../utils/fetchMethods';

import { BoostCamMainIcons } from '../../../utils/SvgIcons';
import { MainStoreContext } from '../MainStore';

const { Close } = BoostCamMainIcons;

const Container = styled.div`
  flex: 1 0 0;
  height: 100%;
  background-color: white;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const ThreadSectionHeader = styled.div`
  width: 100%;
  flex: 1 1 0;
  max-height: 50px;

  font-size: 18px;

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
`;

const ThreadSpan = styled.span`
  font-weight: 600;
`;

const ChannelNameSpan = styled.span`
  margin-left: 5px;
  font-size: 15px;
`;

const ThreadSectionBody = styled.div`
  width: 100%;
  flex: 5 0 0;
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

  padding: 10px 0px;

  border-bottom: 1px solid gray;
`;

const CommentItemBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  &:hover {
    background-color: #f0e7e7;
  }
`;

const CommentItemIcon = styled.div<{ imgUrl: string }>`
  width: 36px;
  height: 36px;
  margin: 10px;
  background-image: url(${(props) => props.imgUrl});
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 8px;
`;

const CommentItem = styled.div`
  width: 90%;
  padding: 8px 0px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const CommentItemHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const CommentSender = styled.span`
  font-weight: 600;
  font-size: 15px;
`;

const CommentTimelog = styled.span`
  font-size: 12px;
  margin-left: 15px;
`;

const CommentContents = styled.span`
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

const CommentTextarea = styled.textarea`
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

const CloseIcon = styled(Close)`
  width: 30px;
  height: 30px;
  fill: #a69c96;
  margin-right: 15px;
`;

function ThreadSection(): JSX.Element {
  const { selectedMessageData, selectedChannel } = useContext(MainStoreContext);
  const textDivRef = useRef<HTMLDivElement>(null);
  const [commentsList, setCommentsList] = useState<CommentData[]>([]);

  const buildCommentElement = (data: MessageData | undefined) => {
    if (!data) return <></>;
    const { id, contents, createdAt, sender } = data;
    const { nickname, profile } = sender;
    return (
      <CommentItemBlock key={id}>
        <CommentItemIcon imgUrl={profile} />
        <CommentItem>
          <CommentItemHeader>
            <CommentSender> {nickname} </CommentSender>
            <CommentTimelog>{createdAt}</CommentTimelog>
          </CommentItemHeader>
          <CommentContents>{contents}</CommentContents>
        </CommentItem>
      </CommentItemBlock>
    );
  };

  const buildMessageElement = (data: MessageData | undefined) => {
    if (!data) return <></>;
    const { contents, createdAt, sender } = data;
    const { nickname, profile } = sender;
    return (
      <MessageItemBlock>
        <CommentItemIcon imgUrl={profile} />
        <CommentItem>
          <CommentItemHeader>
            <CommentSender> {nickname} </CommentSender>
            <CommentTimelog>{createdAt}</CommentTimelog>
          </CommentItemHeader>
          <CommentContents>{contents}</CommentContents>
        </CommentItem>
      </MessageItemBlock>
    );
  };

  const getMessageList = async () => {
    if (!selectedMessageData) return;
    const responseData = await fetchData<null, CommentData[]>(
      'GET',
      `/api/comments?messageId=${selectedMessageData.id}`,
    );
    if (responseData) {
      responseData.sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10));
      setCommentsList(responseData);
    }
  };

  const sendComment = async (contents: string) => {
    const requestBody: CommentRequestBody = {
      channelId: parseInt(selectedChannel, 10),
      messageId: parseInt(selectedMessageData.id, 10),
      contents,
    };
    await fetchData<CommentRequestBody, CommentData>('POST', '/api/comments', requestBody);
    getMessageList();
  };

  const onKeyDownCommentTextarea = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
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
        sendComment(currentTarget.value);
        currentTarget.value = '';
      }
      currentTarget.style.height = '21px';
      if (divRef) divRef.style.height = `105px`;
    }
  };

  useEffect(() => {
    getMessageList();
  }, [selectedMessageData]);

  const mainMessage = buildMessageElement(selectedMessageData);
  const CommentItemList = commentsList.map(buildCommentElement);

  return (
    <Container>
      <ThreadSectionHeader>
        <ChannelName>
          <ThreadSpan>쓰레드</ThreadSpan>
          <ChannelNameSpan>ChannelName</ChannelNameSpan>
        </ChannelName>
        <CloseIcon />
      </ThreadSectionHeader>
      <ThreadSectionBody>
        {mainMessage}
        {CommentItemList}
      </ThreadSectionBody>
      <TextareaDiv ref={textDivRef}>
        <CommentTextarea onKeyDown={onKeyDownCommentTextarea} />
      </TextareaDiv>
    </Container>
  );
}

export default ThreadSection;
