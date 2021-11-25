import React from 'react';
import styled from 'styled-components';
import { MessageData } from '../../../types/message';
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
  messageList: MessageData[];
};

function ContentsSection(props: ContentsSectionProps): JSX.Element {
  const { messageList } = props;
  return (
    <Container>
      <MessageSection messageList={messageList} />
      <ThreadSection />
    </Container>
  );
}

export default ContentsSection;
