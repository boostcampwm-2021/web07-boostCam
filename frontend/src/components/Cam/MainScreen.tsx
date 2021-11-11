import React, { useContext } from 'react';
import styled from 'styled-components';

import { ToggleStoreContext } from './ToggleStore';
import SharedScreen from './SharedScreen';
import { CamStoreContext } from './CamStore';
import type { Screen } from '../../types/cam';
import LocalUserScreen from './LocalUserScreen';
import UserScreen from './UserScreen';

const Container = styled.div<{ activeTab: string[]; isMouseOnCamPage: boolean; numOfScreen: number }>`
  width: ${(props) => props.activeTab[0]};
  height: ${(props) => (props.isMouseOnCamPage ? '90vh' : '98vh')};
  background-color: black;
  display: grid;
  grid-template-columns: repeat(
    ${(props) => {
      let n = 1;
      while (props.numOfScreen > n ** 2) {
        n += 1;
      }
      return n;
    }},
    minmax(30%, auto)
  );
  grid-auto-rows: minmax(100px, auto);
  gap: 20px;
  justify-items: space-evenly;
  align-items: center;
  transition: all 0.5s ease;
`;

function MainScreen(): JSX.Element {
  const { screenList } = useContext(CamStoreContext);
  const { isChattingTabActive, isMouseOnCamPage, isScreenShareActive, screenStream } = useContext(ToggleStoreContext);

  const countActiveTab = (): string[] => {
    if (isChattingTabActive) return ['70vw', '98vw'];
    return ['98vw', '70vw'];
  };

  const handleAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
    e.currentTarget.style.animation = 'none';
  };

  if (isScreenShareActive) {
    return (
      <Container
        activeTab={countActiveTab()}
        onAnimationEnd={handleAnimationEnd}
        isMouseOnCamPage={isMouseOnCamPage}
        numOfScreen={1}
      >
        <SharedScreen stream={screenStream} />
      </Container>
    );
  }

  return (
    <Container
      activeTab={countActiveTab()}
      onAnimationEnd={handleAnimationEnd}
      isMouseOnCamPage={isMouseOnCamPage}
      numOfScreen={screenList.length + 1}
    >
      <LocalUserScreen />
      {screenList.map((screen: Screen) => (
        <UserScreen key={screen.userId} stream={screen.stream} userId={screen.userId} />
      ))}
    </Container>
  );
}

export default MainScreen;
