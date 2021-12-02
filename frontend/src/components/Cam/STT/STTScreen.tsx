import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Status } from '../../../types/cam';
import { flex } from '../../../utils/styledComponentFunc';
import { STTStoreContext } from './STTStore';

const Container = styled.div`
  box-sizing: border-box;
  padding: 5px 10px;
  color: #999999;
  font-size: 10px;
  height: 80px;
  border-bottom: 2px solid #999999;
  margin-top: 5px;
  ${flex('column')}
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
  setLocalStatus: React.Dispatch<React.SetStateAction<Status>>;
};

function STTScreen(props: STTScreenProps): JSX.Element {
  const { sendMessage, setLocalStatus } = props;
  const { lastResult, isSTTActive, isSpeaking } = useContext(STTStoreContext);

  useEffect(() => {
    if (lastResult.isFinal) {
      sendMessage(lastResult.text);
    }
  }, [lastResult]);

  useEffect(() => {
    lastResult.text = '';
  }, [isSTTActive]);

  useEffect(() => {
    setLocalStatus((prev) => ({ ...prev, speaking: isSpeaking }));
  }, [isSpeaking]);

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
