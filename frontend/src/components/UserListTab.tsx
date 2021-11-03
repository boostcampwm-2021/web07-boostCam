import Peer from 'peerjs';
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Socket } from 'socket.io-client';
import UserScreen from './UserScreen';

type UserListTabProps = {
  socket: Socket;
  localStream: MediaStream;
};

const ROOM_ID = 1;

const Container = styled.div``;

function UserListTab({ socket, localStream }: UserListTabProps): JSX.Element {
  const myPeerRef = useRef<Peer>();

  const [screenList, setScreenList] = useState<{ userId: string; stream: MediaStream; peer: Peer.MediaConnection }[]>(
    [],
  );

  useEffect(() => {
    myPeerRef.current = new Peer(undefined, {
      host: 'localhost',
      path: '/peerjs',
      port: 9000,
    });

    socket.on('userDisconnected', ({ userId }) => {
      setScreenList((prev) => {
        prev.find((screen) => screen.userId === userId)?.peer.close();
        return prev.filter((screen) => screen.userId !== userId);
      });
    });
    const myPeer = myPeerRef.current;

    myPeer?.on('open', (userId) => {
      socket.emit('joinRoom', { roomId: ROOM_ID, userId });
    });
  }, []);

  useEffect(() => {
    const connectToNewUser = ({ userId }: { userId: string }) => {
      if (!myPeerRef.current) {
        return;
      }
      const myPeer = myPeerRef.current;
      const call = myPeer.call(userId, localStream);

      call.on('stream', (userVideoStream: MediaStream) => {
        console.log('got stream');
        setScreenList((prev) => [...prev, { userId, stream: userVideoStream, peer: call }]);
      });

      call.on('close', () => {
        setScreenList((prev) => {
          return prev.filter((screen) => screen.userId !== userId);
        });
      });
    };

    const answerToCall = (call: Peer.MediaConnection) => {
      call.answer(localStream);
      call.on('stream', (userVideoStream: MediaStream) => {
        setScreenList((prev) => [...prev, { userId: call.peer, stream: userVideoStream, peer: call }]);
      });
    };

    const myPeer = myPeerRef.current;

    socket.on('userConnected', connectToNewUser);
    myPeer?.on('call', answerToCall);

    return () => {
      socket.off('userConnected', connectToNewUser);
      myPeer?.off('call', answerToCall);
    };
  }, [localStream]);

  return (
    <Container>
      <UserScreen stream={localStream} />
      {screenList.map((screen) => (
        <UserScreen key={screen.userId} stream={screen.stream} />
      ))}
    </Container>
  );
}

export default UserListTab;
