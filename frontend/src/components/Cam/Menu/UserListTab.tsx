import React, { useContext } from 'react';
import styled from 'styled-components';

import UserScreen from '../Screen/UserScreen';
import { CamStoreContext } from '../CamStore';
import LocalUserScreen from '../Screen/LocalUserScreen';
import Draggable from '../../core/Draggable';
import type { Screen } from '../../../types/cam';
import { ToggleStoreContext } from '../ToggleStore';
import { customScroll } from '../../../utils/styledComponentFunc';

const Container = styled.div<{ isActive: boolean }>`
  position: absolute;
  width: 18vw;
  max-height: 70vh;
  padding: 10px;
  background-color: black;
  display: ${(props) => (props.isActive ? 'block' : 'none')};
  overflow-y: auto;

  ${customScroll()};
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
        <LocalUserScreen numOfScreen={1} />
        {screenList.map((screen: Screen) => (
          <UserScreen key={screen.userId} stream={screen.stream} userId={screen.userId} numOfScreen={1} />
        ))}
      </Container>
    </Draggable>
  );
}

export default UserListTab;
