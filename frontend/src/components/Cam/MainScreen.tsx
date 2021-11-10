import React, { useContext } from 'react';
import styled from 'styled-components';
import { ToggleStoreContext } from './ToggleStore';

const Container = styled.div<{ activeTab: string[]; isMouseOnCamPage: boolean }>`
  width: ${(props) => props.activeTab[0]};
  height: ${(props) => (props.isMouseOnCamPage ? '90vh' : '98vh')};
  background-color: #ffffff;
  transition: all 0.5s ease;
`;

function MainScreen(): JSX.Element {
  const { isChattingTabActive, isMouseOnCamPage } = useContext(ToggleStoreContext);

  const countActiveTab = (): string[] => {
    if (isChattingTabActive) return ['70vw', '98vw'];
    return ['98vw', '70vw'];
  };

  const handleAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
    e.currentTarget.style.animation = 'none';
  };

  return (
    <Container activeTab={countActiveTab()} onAnimationEnd={handleAnimationEnd} isMouseOnCamPage={isMouseOnCamPage}>
      MainScreen
    </Container>
  );
}

export default MainScreen;
