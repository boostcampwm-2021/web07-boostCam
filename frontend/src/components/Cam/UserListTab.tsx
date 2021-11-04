import React, { useRef, useState, useEffect, useContext } from 'react';
import Peer from 'peerjs';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import UserScreen from './UserScreen';
import SocketState from '../../atoms/socket';
import { CamStoreContext } from './CamStore';
import LocalUserScreen from './LocalUserScreen';

const Container = styled.div<{ isActive: boolean }>`
  width: 18vw;
  height: 90vh;
  padding: 0 10px;
  background-color: #c4c4c4;
  display: ${(props) => (props.isActive ? 'block' : 'none')};
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

type UserListProps = {
  isUserListTabActive: boolean;
};

const ROOM_ID = 1;

function UserListTab(props: UserListProps): JSX.Element {
  const { isUserListTabActive } = props;
  const { localStream, localStatus } = useContext(CamStoreContext);
  const socket = useRecoilValue(SocketState);

  const myPeerRef = useRef<Peer>();
  const [screenList, setScreenList] = useState<{ userId: string; stream: MediaStream; peer: Peer.MediaConnection }[]>(
    [],
  );

  useEffect(() => {
    myPeerRef.current = new Peer(undefined, {
      host: '/',
      path: '/peerjs',
      port: parseInt(process.env.REACT_APP_PEERJS_PORT as string, 10),
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

      let flag = false;
      call.on('stream', (userVideoStream: MediaStream) => {
        if (flag) {
          return;
        }
        flag = true;
        setScreenList((prev) => [...prev, { userId, stream: userVideoStream, peer: call }]);
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
        setScreenList((prev) => [...prev, { userId: call.peer, stream: userVideoStream, peer: call }]);
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

  return (
    <Container isActive={isUserListTabActive}>
      <LocalUserScreen stream={localStream} localStatus={localStatus} />
      {screenList.map((screen) => (
        <UserScreen key={screen.userId} stream={screen.stream} userId={screen.userId} />
      ))}
    </Container>
  );
}

export default UserListTab;
