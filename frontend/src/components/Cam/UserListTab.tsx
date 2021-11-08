import React, { useRef, useState, useEffect, useContext } from 'react';
import Peer from 'peerjs';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import UserScreen from './UserScreen';
import SocketState from '../../atoms/socket';
import { CamStoreContext } from './CamStore';
import LocalUserScreen from './LocalUserScreen';
import Draggable from '../core/Draggable';

const Container = styled.div<{ isActive: boolean }>`
  position: absolute;
  width: 18vw;
  max-height: 70vh;
  padding: 0 10px;
  background-color: #c4c4c4;
  display: ${(props) => (props.isActive ? 'block' : 'none')};
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }

  border: 1px solid red;
`;

type UserListProps = {
  isUserListTabActive: boolean;
};

const ROOM_ID = '1';

function UserListTab(props: UserListProps): JSX.Element {
  const { isUserListTabActive } = props;
  const { localStream, localStatus } = useContext(CamStoreContext);
  const socket = useRecoilValue(SocketState);

  const myPeerRef = useRef<Peer>();
  const [screenList, setScreenList] = useState<{ userId: string; stream: MediaStream; peer: Peer.MediaConnection }[]>(
    [],
  );

  const localUserIdRef = useRef<string>();

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
      localUserIdRef.current = userId;
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

    if (localStream.active) {
      socket.emit('joinRoom', { roomId: ROOM_ID, userId: localUserIdRef.current, status: localStatus });
    }

    return () => {
      socket.off('userConnected', connectToNewUser);
      myPeer?.off('call', answerToCall);
    };
  }, [localStream]);

  useEffect(() => {
    socket.emit('updateUserStatus', { userId: localUserIdRef.current, status: localStatus });
  }, [localStatus]);

  return (
    <Draggable
      defaultPosition={{
        x: '62vw',
        y: '5px',
        childHeight: '90vh',
        childWidth: '18vw',
      }}
      isActive={isUserListTabActive}
    >
      <Container isActive={isUserListTabActive}>
        <LocalUserScreen stream={localStream} localStatus={localStatus} />
        {screenList.map((screen) => (
          <UserScreen key={screen.userId} stream={screen.stream} userId={screen.userId} />
        ))}
      </Container>
    </Draggable>
  );
}

export default UserListTab;
