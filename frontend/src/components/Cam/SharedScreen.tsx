import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
`;

type SharedScreenProps = {
  stream: MediaStream | null;
};

function SharedScreen(props: SharedScreenProps): JSX.Element | null {
  const { stream } = props;
  if (!stream) {
    return null;
  }

  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }
    video.srcObject = stream;
  }, []);

  return (
    <Container>
      <Video ref={videoRef} autoPlay playsInline>
        <track kind="captions" />
      </Video>
    </Container>
  );
}

export default SharedScreen;
