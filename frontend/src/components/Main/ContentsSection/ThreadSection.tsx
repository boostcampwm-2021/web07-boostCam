import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { CommentData, CommentRequestBody } from '../../../types/comment';
import { MessageData } from '../../../types/message';
import fetchData from '../../../utils/fetchMethods';

import { BoostCamMainIcons } from '../../../utils/SvgIcons';
import { MainStoreContext } from '../MainStore';

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

const { Close } = BoostCamMainIcons;

const Container = styled.div`
  flex: 0 0 400px;
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

const MessageItemBlock = styled.div<{ isComment: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  ${(props) =>
    props.isComment
      ? `&:hover {
  background-color: #f0e7e7;
}`
      : ` 
  padding: 10px 0px;
  border-bottom: 1px solid gray;
`}
`;

const CloseIcon = styled(Close)`
  width: 30px;
  height: 30px;
  fill: #a69c96;
  margin-right: 15px;
  cursor: pointer;
`;

type ThreadSectionProps = {
  setIsThreadOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function ThreadSection(props: ThreadSectionProps): JSX.Element {
  const { selectedMessageData, selectedChannel } = useContext(MainStoreContext);
  const { setIsThreadOpen } = props;
  const textDivRef = useRef<HTMLDivElement>(null);
  const [commentsList, setCommentsList] = useState<CommentData[]>([]);

  const commentInnerElement = (data: MessageData) => {
    const { contents, createdAt, sender } = data;
    const { nickname, profile } = sender;
    return (
      <>
        <MessageItemIcon imgUrl={profile} />
        <MessageItem>
          <MessageItemHeader>
            <MessageSender> {nickname} </MessageSender>
            <MessageTimelog>{createdAt}</MessageTimelog>
          </MessageItemHeader>
          <MessageContents>{contents}</MessageContents>
        </MessageItem>
      </>
    );
  };

  const buildCommentElement = (data: MessageData | undefined, isComment: boolean) => {
    if (!data) return <></>;
    const { id } = data;
    return (
      <MessageItemBlock isComment={isComment} key={id}>
        {commentInnerElement(data)}
      </MessageItemBlock>
    );
  };

  const getMessageList = async () => {
    if (!selectedMessageData) return;
    const { data } = await fetchData<null, CommentData[]>('GET', `/api/comments?messageId=${selectedMessageData.id}`);
    if (data) {
      data.sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10));
      setCommentsList(data);
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

  const onClickCloseIcon = () => {
    setIsThreadOpen(false);
  };

  useEffect(() => {
    getMessageList();
  }, [selectedMessageData]);

  const mainMessage = buildCommentElement(selectedMessageData, false);
  const CommentItemList = commentsList.map((data) => buildCommentElement(data, true));

  return (
    <Container>
      <ThreadSectionHeader>
        <ChannelName>
          <ThreadSpan>쓰레드</ThreadSpan>
          <ChannelNameSpan>ChannelName</ChannelNameSpan>
        </ChannelName>
        <CloseIcon onClick={onClickCloseIcon} />
      </ThreadSectionHeader>
      <ThreadSectionBody>
        {mainMessage}
        {CommentItemList}
      </ThreadSectionBody>
      <TextareaDiv ref={textDivRef}>
        <MessageTextarea onKeyDown={onKeyDownCommentTextarea} />
      </TextareaDiv>
    </Container>
  );
}

export default ThreadSection;
