import React, { useContext } from 'react';
import styled from 'styled-components';

import UserScreen from './UserScreen';
import { CamStoreContext } from './CamStore';
import LocalUserScreen from './LocalUserScreen';
import Draggable from '../core/Draggable';
import type { Screen } from '../../types/cam';
import { ToggleStoreContext } from './ToggleStore';

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

function UserListTab(): JSX.Element {
  const { screenList } = useContext(CamStoreContext);
  const { isUserListTabActive } = useContext(ToggleStoreContext);

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
