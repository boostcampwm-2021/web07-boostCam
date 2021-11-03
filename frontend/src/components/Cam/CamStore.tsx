import React, { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import UserListTab from './UserListTab';

type CamStoreProps = {
  socket: Socket;
  isUserListTabActive: boolean;
};

function CamStore({ socket, isUserListTabActive }: CamStoreProps): JSX.Element {
  const [localStream, setLocalStream] = useState<MediaStream>(new MediaStream());

  const getUserMedia = async () => {
    try {
      const media = await navigator.mediaDevices.getUserMedia({ video: true });
      setLocalStream(media);
    } catch {
      const createEmptyVideoTrack = () => {
        const canvas = Object.assign(document.createElement('canvas'), { width: 600, height: 480 });
        canvas?.getContext('2d')?.fillRect(0, 0, 600, 400);

        const stream = canvas.captureStream();
        const track = stream.getVideoTracks()[0];

        return Object.assign(track, { enabled: false });
      };
      const track = createEmptyVideoTrack();
      setLocalStream(new MediaStream([track]));
    }
  };

  useEffect(() => {
    getUserMedia();
  }, []);

  return <UserListTab socket={socket} localStream={localStream} isUserListTabActive={isUserListTabActive} />;
}

export default CamStore;
