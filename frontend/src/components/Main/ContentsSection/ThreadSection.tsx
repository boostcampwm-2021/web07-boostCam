import React, { useContext, useRef } from 'react';
import styled from 'styled-components';
import ChannelEntity from '../../../types/channel';
import { CommentListInfo, CommentRequestBody } from '../../../types/comment';
import { MessageData } from '../../../types/message';
import { customScroll, flex } from '../../../utils/styledComponentFunc';

import { BoostCamMainIcons } from '../../../utils/svgIcons';
import Loading from '../../core/Loading';
import { MainStoreContext } from '../MainStore';

import { TextareaDiv, MessageTextarea, messageInnerElement, onKeyDownMessageTextarea } from './ContentsSectionCommon';

const { Close } = BoostCamMainIcons;

const Container = styled.div`
  flex: 0 0 400px;
  height: 100%;
  background-color: white;
  ${flex('column', 'flex-start')}
`;

const ThreadSectionHeader = styled.div`
  width: 100%;
  flex: 1 1 0;
  max-height: 50px;

  font-size: 18px;
  ${flex('row', 'space-between', 'center')};
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
  margin-left: 10px;
  font-size: 12px;
  color: gray;
`;

const ThreadSectionBody = styled.div`
  width: 100%;
  flex: 5 0 0;
  overflow-y: auto;
  ${flex('column', 'flex-start', 'flex-start')};
  ${customScroll()};
`;

const MessageItemBlock = styled.div<{ isComment: boolean }>`
  width: 100%;
  ${flex('row', 'flex-start', 'flex-start')}

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

const NoCommentDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NoCommentTitle = styled.span`
  font-size: 25px;
  font-weight: 400;
`;

const NoCommentDescription = styled.span`
  margin-top: 15px;
  font-size: 15px;
`;

const CloseIcon = styled(Close)`
  width: 30px;
  height: 30px;
  fill: #a69c96;
  margin-right: 15px;
  cursor: pointer;
`;

const buildCommentElement = (data: MessageData | undefined, isComment: boolean) => {
  if (!data) return <></>;
  const { id } = data;
  return (
    <MessageItemBlock isComment={isComment} key={id}>
      {messageInnerElement(data)}
    </MessageItemBlock>
  );
};

type ThreadSectionProps = {
  setIsThreadOpen: React.Dispatch<React.SetStateAction<boolean>>;
  channelInfo: ChannelEntity | undefined;
  commentList: CommentListInfo;
};

function ThreadSection(props: ThreadSectionProps): JSX.Element {
  const { selectedMessageData, selectedChannel, socket } = useContext(MainStoreContext);
  const { setIsThreadOpen, channelInfo, commentList } = props;
  const textDivRef = useRef<HTMLDivElement>(null);

  const sendComment = async (contents: string) => {
    const requestBody: CommentRequestBody = {
      channelId: parseInt(selectedChannel, 10),
      messageId: parseInt(selectedMessageData.id, 10),
      contents,
    };
    socket.emit('sendComment', requestBody);
  };

  const onClickCloseIcon = () => {
    setIsThreadOpen(false);
  };

  const buildCommentItemList = () => {
    if (!commentList.commentData.length) {
      return (
        <NoCommentDiv>
          <NoCommentTitle>아직 댓글이 없습니다</NoCommentTitle>
          <NoCommentDescription>첫 번째 댓글을 달아보세요!</NoCommentDescription>
        </NoCommentDiv>
      );
    }
    return commentList.commentData.map((data) => buildCommentElement(data, true));
  };

  const mainMessage = buildCommentElement(selectedMessageData, false);
  const CommentItemList = buildCommentItemList();

  return (
    <Container>
      <ThreadSectionHeader>
        <ChannelName>
          <ThreadSpan>쓰레드</ThreadSpan>
          <ChannelNameSpan># {channelInfo && channelInfo.name}</ChannelNameSpan>
        </ChannelName>
        <CloseIcon onClick={onClickCloseIcon} />
      </ThreadSectionHeader>
      <ThreadSectionBody>
        {mainMessage}
        {commentList.isLoading ? <Loading /> : CommentItemList}
      </ThreadSectionBody>
      <TextareaDiv ref={textDivRef}>
        <MessageTextarea onKeyDown={(e) => onKeyDownMessageTextarea(e, textDivRef, sendComment)} />
      </TextareaDiv>
    </Container>
  );
}

export default ThreadSection;
