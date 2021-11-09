import React, { useContext } from 'react';
import styled from 'styled-components';

import UserScreen from './UserScreen';
import { CamStoreContext } from './CamStore';
import LocalUserScreen from './LocalUserScreen';
import Draggable from '../core/Draggable';
import type { Screen } from '../../types/cam';

const Container = styled.div<{ isActive: boolean }>`
  position: absolute;
  width: 18vw;
  max-height: 70vh;
  padding: 0 10px;
  background-color: #c4c4c4;
  display: ${(props) => (props.isActive ? 'block' : 'none')};
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #999999;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: #cccccc;
    border-radius: 10px;
  }
  &:hover {
    border: 2px solid #00ff2e;
  }
`;

type UserInfo = {
  roomId: number | null;
  nickname: string | null;
};

type UserListProps = {
  isUserListTabActive: boolean;
  userInfo: UserInfo | null;
};

function UserListTab(props: UserListProps): JSX.Element {
  const { isUserListTabActive, userInfo } = props;
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

    const currentUrl = new URL(window.location.href).searchParams;

    if (localStream.active) {
      socket.emit('joinRoom', { roomId: currentUrl.get('roomid'), userId: localUserIdRef.current });
    }

  return (
    <Draggable
      defaultPosition={{
        x: '0vw',
        y: '0vh',
      }}
      isActive={isUserListTabActive}
    >
      <Container isActive={isUserListTabActive}>
        <LocalUserScreen />
        {screenList.map((screen: Screen) => (
          <UserScreen key={screen.userId} stream={screen.stream} userId={screen.userId} />
        ))}
      </Container>
    </Draggable>
  );
}

export default UserListTab;
