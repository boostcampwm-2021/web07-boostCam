import React from 'react';
import styled from 'styled-components';

import { ReactComponent as MicIcon } from '../../assets/icons/mic.svg';
import { ReactComponent as VideoIcon } from '../../assets/icons/video.svg';

const Container = styled.div`
  position: relative;
  bottom: 20px;
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Button = styled.div<{ status?: boolean }>`
  width: 16px;
  height: 16px;
  margin: 0 3px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  color: ${(props) => (props.status ? '#00ff2e' : 'red')};
`;

const Nickname = styled.div`
  color: white;
`;

type StreamStatusIndicatorProps = {
  micStatus: boolean;
  videoStatus: boolean;
  nickname: string;
};
function StreamStatusIndicator(props: StreamStatusIndicatorProps): JSX.Element {
  const { micStatus, videoStatus, nickname } = props;

  return (
    <Container>
      <Nickname>{nickname}</Nickname>
      <Button status={micStatus}>
        <MicIcon />
      </Button>
      <Button status={videoStatus}>
        <VideoIcon />
      </Button>
    </Container>
  );
}

export default StreamStatusIndicator;
