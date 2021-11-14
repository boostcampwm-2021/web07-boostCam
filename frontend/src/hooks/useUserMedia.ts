import Peer from 'peerjs';
import { useEffect, useState, useRef } from 'react';
import { Socket } from 'socket.io-client';

import type { Status, Screen, UserInfo } from '../types/cam';

type UseUserMediaProps = {
  socket: Socket;
  roomId: string | null;
  userInfo: UserInfo;
};

export default function useUserMedia(props: UseUserMediaProps): {
  localStream: MediaStream;
  setLocalStream: typeof setLocalStream;
  localStatus: Status;
  setLocalStatus: typeof setLocalStatus;
  screenList: Array<Screen>;
} {
  const { socket, roomId, userInfo } = props;
  const [localStream, setLocalStream] = useState<MediaStream>(new MediaStream());
  const [localStatus, setLocalStatus] = useState<Status>({
    video: false,
    audio: false,
    stream: false,
  });
  const [screenList, setScreenList] = useState<Screen[]>([]);
  const myPeerRef = useRef<Peer>();
  const peerIdRef = useRef<string>();

  const getUserMedia = async () => {
    console.log(userInfo);
    try {
      const media = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      const newStatus = { video: true, audio: true, stream: true };
      setLocalStream(media);
      setLocalStatus(newStatus);
      socket.emit('joinRoom', {
        roomId,
        userId: peerIdRef.current,
        userNickname: userInfo.nickname,
        status: newStatus,
      });
    } catch {
      const canvas = document.createElement('canvas');
      const stream = canvas.captureStream();
      const track = stream.getVideoTracks()[0];

      const newStatus = { video: false, audio: false, stream: false };
      setLocalStream(new MediaStream([track]));
      setLocalStatus(newStatus);
      socket.emit('joinRoom', {
        roomId,
        userId: peerIdRef.current,
        userNickname: userInfo.nickname,
        status: newStatus,
      });
    }
  };

  useEffect(() => {
    myPeerRef.current = new Peer(undefined, {
      host: '/',
      path: '/peerjs',
      port: parseInt(process.env.REACT_APP_PEERJS_PORT as string, 10),
    });

    socket.on('userDisconnected', ({ userId }: { userId: string }) => {
      setScreenList((prev) => {
        prev.find((screen) => screen.userId === userId)?.call.close();
        return prev.filter((screen) => screen.userId !== userId);
      });
    });

    myPeerRef.current.on('open', (userId) => {
      peerIdRef.current = userId;
    });
    getUserMedia();
  }, []);

  useEffect(() => {
    const connectToNewUser = ({ userId }: { userId: string }) => {
      if (!myPeerRef.current) {
        return;
      }
      const myPeer = myPeerRef.current;
      const call = myPeer.call(userId, localStream);

      let flag = false;
      call.on('stream', (userVideoStream: MediaStream) => {
        if (flag) {
          return;
        }
        flag = true;
        setScreenList((prev) => [...prev, { userId, stream: userVideoStream, call }]);
      });

      call.on('close', () => {
        setScreenList((prev) => {
          return prev.filter((screen) => screen.userId !== userId);
        });
      });
    };

    const answerToCall = (call: Peer.MediaConnection) => {
      let flag = false;
      call.on('stream', (userVideoStream: MediaStream) => {
        if (flag) {
          return;
        }

        flag = true;
        setScreenList((prev) => [...prev, { userId: call.peer, stream: userVideoStream, call }]);
      });
      call.answer(localStream);
    };

    const myPeer = myPeerRef.current;

    socket.on('userConnected', connectToNewUser);
    myPeer?.on('call', answerToCall);

    return () => {
      socket.off('userConnected', connectToNewUser);
      myPeer?.off('call', answerToCall);
    };
  }, [localStream]);

  useEffect(() => {
    if (peerIdRef.current) socket.emit('updateUserStatus', { status: localStatus });
  }, [localStatus]);

  return { localStream, setLocalStream, localStatus, setLocalStatus, screenList };
}
