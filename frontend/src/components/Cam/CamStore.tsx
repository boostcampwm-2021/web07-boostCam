import React, { useEffect, useState, createContext } from 'react';
import Status from '../../types/cam';

type CamStoreProps = {
  children: React.ReactChild[];
};

export const CamStoreContext = createContext<React.ComponentState>(null);

function CamStore(props: CamStoreProps): JSX.Element {
  const { children } = props;
  const [localStream, setLocalStream] = useState<MediaStream>(new MediaStream());
  const [localStatus, setLocalStatus] = useState<Status>({
    video: false,
    audio: false,
    stream: false,
  });

  const getUserMedia = async () => {
    try {
      const media = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(media);
      setLocalStatus({ video: true, audio: true, stream: true });
    } catch {
      const createEmptyVideoTrack = () => {
        const canvas = document.createElement('canvas');
        const stream = canvas.captureStream();
        const track = stream.getVideoTracks()[0];

        return track;
      };
      const track = createEmptyVideoTrack();
      setLocalStream(new MediaStream([track]));
    }
  };

  useEffect(() => {
    getUserMedia();
  }, []);

  return (
    <CamStoreContext.Provider value={{ localStream, localStatus, setLocalStatus }}>{children}</CamStoreContext.Provider>
  );
}

export default CamStore;
