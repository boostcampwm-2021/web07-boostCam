import React, { useContext } from 'react';
import styled from 'styled-components';

import { ToggleStoreContext } from '../ToggleStore';
import SharedScreen from '../SharedScreen/SharedScreen';
import { CamStoreContext } from '../CamStore';
import type { Screen } from '../../../types/cam';
import LocalUserScreen from './LocalUserScreen';
import UserScreen from './UserScreen';
import { SharedScreenStoreContext } from '../SharedScreen/SharedScreenStore';

const Container = styled.div<{ activeTab: string[]; numOfScreen: number }>`
  width: ${(props) => props.activeTab[0]};
  height: 90vh;
  background-color: black;
  display: grid;
  grid-template-columns: repeat(${(props) => Math.ceil(props.numOfScreen ** 0.5)}, minmax(30%, auto));
  grid-auto-rows: minmax(100px, auto);
  gap: 20px;
  justify-items: space-evenly;
  align-items: center;
  transition: all 0.5s ease;
`;

function MainScreen(): JSX.Element {
  const { screenList } = useContext(CamStoreContext);
  const { isChattingTabActive } = useContext(ToggleStoreContext);
  const { sharedScreen } = useContext(SharedScreenStoreContext);

  const countActiveTab = (): string[] => {
    if (isChattingTabActive) return ['70vw', '98vw'];
    return ['98vw', '70vw'];
  };

  const handleAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
    e.currentTarget.style.animation = 'none';
  };

  if (sharedScreen !== null) {
    return (
      <Container activeTab={countActiveTab()} onAnimationEnd={handleAnimationEnd} numOfScreen={1}>
        <SharedScreen stream={sharedScreen} />
      </Container>
    );
  }

  return (
    <Container activeTab={countActiveTab()} onAnimationEnd={handleAnimationEnd} numOfScreen={screenList.length + 1}>
      <LocalUserScreen />
      {screenList.map((screen: Screen) => (
        <UserScreen key={screen.userId} stream={screen.stream} userId={screen.userId} />
      ))}
    </Container>
  );
}

export default MainScreen;
