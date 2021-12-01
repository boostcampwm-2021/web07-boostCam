import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import RoomListSection from './RoomListSection';
import ContentsSection from './ContentsSection/ContentsSection';
import MainHeader from './MainHeader';
import { MessageData, MessageListInfo } from '../../types/message';
import { fetchData } from '../../utils/fetchMethods';
import { MainStoreContext } from './MainStore';
import ServerJoinSection from './ContentsSection/ServerJoinSection';
import { CommentData, CommentListInfo } from '../../types/comment';
import { flex } from '../../utils/styledComponentFunc';

const Container = styled.div`
  width: 100%;
  height: 100%;
  ${flex('column')};
`;

const MainBody = styled.div`
  width: 100%;
  flex: 1;
  background-color: #222323;
  ${flex('row', 'flex-start', 'center')};
`;

function MainSection(): JSX.Element {
  const { serverList, selectedChannel, selectedMessageData, socket } = useContext(MainStoreContext);
  const [messageList, setMessageList] = useState<MessageListInfo>({
    messageData: [],
    isLoading: true,
  });
  const isJoinedServerExists = !!serverList.length;

  const [commentList, setCommentList] = useState<CommentListInfo>({
    commentData: [],
    isLoading: true,
  });

  const getMessageList = async () => {
    const { data } = await fetchData<null, MessageData[]>('GET', `/api/messages?channelId=${selectedChannel}`);

    if (data) {
      data.sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10));
      setMessageList({
        messageData: data,
        isLoading: false,
      });
    }
  };

  const getCommentList = async () => {
    if (!selectedMessageData) return;
    const { data } = await fetchData<null, CommentData[]>('GET', `/api/comments?messageId=${selectedMessageData.id}`);
    if (data) {
      data.sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10));
      setCommentList({
        commentData: data,
        isLoading: false,
      });
    }
  };

  useEffect(() => {
    const receiveMessageHandler = (message: MessageData) => {
      if (selectedChannel === message.channelId)
        setMessageList((list) => {
          return {
            messageData: [...list.messageData, message],
            isLoading: false,
          };
        });
    };

    socket.on('receiveMessage', receiveMessageHandler);
    if (selectedChannel) {
      setMessageList({
        messageData: [],
        isLoading: true,
      });
      getMessageList();
    }
    return () => {
      socket.off('receiveMessage', receiveMessageHandler);
    };
  }, [selectedChannel]);

  useEffect(() => {
    if (selectedMessageData) {
      setCommentList({
        commentData: [],
        isLoading: true,
      });
      getCommentList();
    }

    const receiveCommentHandler = (comment: CommentData) => {
      if (selectedMessageData.id === comment.messageId) {
        setCommentList((list) => {
          return {
            commentData: [...list.commentData, comment],
            isLoading: false,
          };
        });
      }
    };

    socket.on('receiveComment', receiveCommentHandler);

    return () => {
      socket.off('receiveComment', receiveCommentHandler);
    };
  }, [selectedMessageData]);

  return (
    <Container>
      <MainHeader />
      <MainBody>
        {isJoinedServerExists && <RoomListSection />}
        {isJoinedServerExists && <ContentsSection messageList={messageList} commentList={commentList} />}
        {!isJoinedServerExists && <ServerJoinSection />}
      </MainBody>
    </Container>
  );
}

export default MainSection;
