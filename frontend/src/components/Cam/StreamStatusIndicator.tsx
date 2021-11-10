import React from 'react';
import styled from 'styled-components';

import { ReactComponent as MicIcon } from '../../assets/icons/mic.svg';
import { ReactComponent as VideoIcon } from '../../assets/icons/video.svg';

const Container = styled.div`
  margin-top: 2px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Button = styled.div<{ status?: boolean }>`
  width: 2vw;
  height: 2vh;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  color: ${(props) => (props.status ? '#00ff2e' : 'red')};

  &:hover {
    color: ${(props) => (props.status ? 'red' : '#00ff2e')};
    transition: all 0.5s;
    cursor: pointer;
  }

  svg {
    min-width: 6vh;
    height: 6vh;
  }
`;

type StreamStatusIndicatorProps = {
  micStatus: boolean;
  videoStatus: boolean;
};
function StreamStatusIndicator(props: StreamStatusIndicatorProps): JSX.Element {
  const { micStatus, videoStatus } = props;

  return (
    <Container>
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
