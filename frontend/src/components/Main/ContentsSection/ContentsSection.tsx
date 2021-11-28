import React, { useState } from 'react';
import styled from 'styled-components';
import { MessageData, MessageListInfo } from '../../../types/message';
import MessageSection from './MessageSection';
import ThreadSection from './ThreadSection';

const Container = styled.div`
  flex: 1 0 0;
  height: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

type ContentsSectionProps = {
  messageList: MessageListInfo;
};

function ContentsSection(props: ContentsSectionProps): JSX.Element {
  const [isThreadOpen, setIsThreadOpen] = useState(false);
  const { messageList } = props;
  return (
    <Container>
      <MessageSection messageList={messageList} setIsThreadOpen={setIsThreadOpen} />
      {isThreadOpen && <ThreadSection setIsThreadOpen={setIsThreadOpen} />}
    </Container>
  );
}

export default ContentsSection;
