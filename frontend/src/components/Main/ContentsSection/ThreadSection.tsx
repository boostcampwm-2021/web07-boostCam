import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { MessageData } from '../../../types/messags';
import fetchData from '../../../utils/fetchMethods';

import { BoostCamMainIcons } from '../../../utils/SvgIcons';
import { MainStoreContext } from '../MainStore';

const { Close } = BoostCamMainIcons;

const Container = styled.div`
  flex: 1 0 0;
  height: 100%;
  background-color: white;
`;

const ThreadSectionHeader = styled.div`
  width: 100%;
  height: 50px;

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
  const { selectedMessageData } = useContext(MainStoreContext);

  const buildCommentElement = (data: MessageData | undefined) => {
    if (!data) return <></>;
    const { contents, createdAt, sender } = data;
    const { nickname, profile } = sender;
    return (
      <CommentItemBlock>
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

  useEffect(() => {
    console.log(selectedMessageData);
  }, [selectedMessageData]);

  const mainMessage = buildMessageElement(selectedMessageData);

  return (
    <Container>
      <ThreadSectionHeader>
        <ChannelName>
          <ThreadSpan>쓰레드</ThreadSpan>
          <ChannelNameSpan>ChannelName</ChannelNameSpan>
        </ChannelName>
        <CloseIcon />
      </ThreadSectionHeader>
      <ThreadSectionBody>{mainMessage}</ThreadSectionBody>
      <TextareaDiv>
        <CommentTextarea />
      </TextareaDiv>
    </Container>
  );
}

export default ThreadSection;
