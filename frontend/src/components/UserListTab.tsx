import Peer from 'peerjs';
import React, { useState, useEffect, useRef } from 'react';
import { Socket } from 'socket.io-client';
import UserScreen from './UserScreen';

type UserListTabProps = {
  socket: Socket;
};

const ROOM_ID = 1;

function UserListTab(props: UserListTabProps): JSX.Element {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const myPeerRef = useRef<Peer>();
  const { socket } = props;
  const [screenList, setScreenList] = useState<{ userId: string; stream: MediaStream; peer: Peer.MediaConnection }[]>(
    [],
  );

  const getUserMedia = async () => {
    const media = await navigator.mediaDevices.getUserMedia({ video: true });
    return media;
  };

  function connectToNewUser(userId: string, stream: MediaStream) {
    if (!myPeerRef.current) {
      return;
    }
    const myPeer = myPeerRef.current;
    const call = myPeer.call(userId, stream);
    let count = 0;
    call.on('stream', (userVideoStream: MediaStream) => {
      count += 1;
      if (count === 2) {
        return;
      }
      setScreenList((prev) => [...prev, { userId, stream: userVideoStream, peer: call }]);
    });

    call.on('close', () => {
      setScreenList((prev) => {
        return prev.filter((screen) => screen.userId !== userId);
      });
    });
  }

  useEffect(() => {
    const init = async () => {
      myPeerRef.current = new Peer(undefined, {
        host: 'localhost',
        path: '/peerjs',
        port: 9000,
      });
      socket.on('userDisconnected', ({ userId }) => {
        console.log(`User Disconnected: ${userId}`);

        setScreenList((prev) => {
          prev.find((screen) => screen.userId === userId)?.peer.close();
          return prev.filter((screen) => screen.userId !== userId);
        });
      });

      const myPeer = myPeerRef.current;
      myPeer.on('open', (userId) => {
        socket.emit('joinRoom', { roomId: ROOM_ID, userId });
      });

      const media = await getUserMedia();
      if (!localVideoRef.current) {
        return;
      }
      localVideoRef.current.srcObject = media;

      myPeer.on('call', (call) => {
        call.answer(media);
        let count = 0;
        call.on('stream', (userVideoStream: MediaStream) => {
          count += 1;
          if (count === 2) {
            return;
          }
          setScreenList((prev) => [...prev, { userId: call.peer, stream: userVideoStream, peer: call }]);
        });
      });

      socket.on('userConnected', ({ userId }) => {
        connectToNewUser(userId, media);
      });
    };
    init();
  }, []);

  return (
    <div>
      <video ref={localVideoRef} playsInline autoPlay>
        <track kind="captions" />
      </video>
      {screenList.map((screen) => (
        <UserScreen key={screen.userId} stream={screen.stream} />
      ))}
    </div>
  );
}

export default UserListTab;
