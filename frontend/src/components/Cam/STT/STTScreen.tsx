import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import { STTStoreContext } from './STTStore';

const Container = styled.div`
  box-sizing: border-box;
  padding: 5px 10px;
  color: #999999;
  font-size: 10px;
  height: 80px;
  border-bottom: 2px solid #999999;
  margin-top: 5px;

  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-weight: bold;
`;

const Content = styled.div`
  margin: 5px 0;
  overflow: auto;
`;

type STTScreenProps = {
  sendMessage: (msg: string) => void;
};

function STTScreen(props: STTScreenProps): JSX.Element {
  const { sendMessage } = props;
  const { lastResult, isSTTActive } = useContext(STTStoreContext);

  useEffect(() => {
    if (lastResult.isFinal) {
      sendMessage(lastResult.text);
    }
  }, [lastResult]);

  useEffect(() => {
    lastResult.text = '';
  }, [isSTTActive]);

  return isSTTActive ? (
    <Container>
      <Title>STT Monitor</Title>
      <Content>{lastResult.text}</Content>
    </Container>
  ) : (
    <></>
  );
}

export default STTScreen;
