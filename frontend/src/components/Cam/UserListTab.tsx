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
  background-color: black;
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
  const { screenList } = useContext(CamStoreContext);
  const screenWidth = '100%';

  return (
    <Draggable
      defaultPosition={{
        x: '0vw',
        y: '0vh',
      }}
      isActive={isUserListTabActive}
    >
      <Container isActive={isUserListTabActive}>
        <LocalUserScreen screenWidth={screenWidth} />
        {screenList.map((screen: Screen) => (
          <UserScreen key={screen.userId} stream={screen.stream} userId={screen.userId} screenWidth={screenWidth} />
        ))}
      </Container>
    </Draggable>
  );
}

export default UserListTab;
