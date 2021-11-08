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
    display: none;
  }

  border: 1px solid red;
`;

type UserListProps = {
  isUserListTabActive: boolean;
};

function UserListTab(props: UserListProps): JSX.Element {
  const { isUserListTabActive } = props;
  const { screenList } = useContext(CamStoreContext);

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
        <LocalUserScreen />
        {screenList.map((screen: Screen) => (
          <UserScreen key={screen.userId} stream={screen.stream} userId={screen.userId} />
        ))}
      </Container>
    </Draggable>
  );
}

export default UserListTab;
