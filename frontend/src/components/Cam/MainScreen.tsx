import React from 'react';
import styled from 'styled-components';

const Container = styled.div<{ activeTab: string[]; isMouseOnCamPage: boolean }>`
  width: ${(props) => props.activeTab[0]};
  height: ${(props) => (props.isMouseOnCamPage ? '90vh' : '98vh')};
  background-color: #ffffff;
  transition: all 0.5s ease;
`;

type MainScreenProps = {
  tabActive: { isUserListTabActive: boolean; isChattingTabActive: boolean };
  isMouseOnCamPage: boolean;
};

function MainScreen(props: MainScreenProps): JSX.Element {
  const { tabActive, isMouseOnCamPage } = props;
  const { isChattingTabActive } = tabActive;

  const countActiveTab = (): string[] => {
    if (isChattingTabActive) return ['70vw', '98vw'];
    return ['98vw', '70vw'];
  };

  const handleAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
    console.log(e.currentTarget.style.animation);
    e.currentTarget.style.animation = 'none';
  };

  return (
    <Container activeTab={countActiveTab()} onAnimationEnd={handleAnimationEnd} isMouseOnCamPage={isMouseOnCamPage}>
      MainScreen
    </Container>
  );
}

export default MainScreen;
