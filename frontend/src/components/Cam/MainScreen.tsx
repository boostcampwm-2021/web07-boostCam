import React from 'react';
import styled from 'styled-components';

const Container = styled.div<{ activeTab: string[] }>`
  width: ${(props) => props.activeTab[0]};
  height: 90vh;
  background-color: #c4c4c4;

  transition: all 0.5s ease;
`;

type MainScreenProps = {
  tabActive: { isUserListTabActive: boolean; isChattingTabActive: boolean };
};

function MainScreen(props: MainScreenProps): JSX.Element {
  const { tabActive } = props;
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
    <Container activeTab={countActiveTab()} onAnimationEnd={handleAnimationEnd}>
      MainScreen
    </Container>
  );
}

export default MainScreen;
