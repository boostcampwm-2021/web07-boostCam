import React from 'react';
import styled from 'styled-components';

const Container = styled.div<{ activeTab: string }>`
  width: ${(props) => props.activeTab};
  height: 90vh;
  background-color: #c4c4c4;
`;

type MainScreenProps = {
  tabActive: { isUserListTabActive: boolean; isChattingTabActive: boolean };
};

function MainScreen(props: MainScreenProps): JSX.Element {
  const { tabActive } = props;
  const { isChattingTabActive, isUserListTabActive } = tabActive;

  const countActiveTab = (): string => {
    if (isChattingTabActive && isUserListTabActive) return '60vw';
    if (isChattingTabActive || isUserListTabActive) return '79vw';
    return '98vw';
  };

  return (
    <Container activeTab={countActiveTab()}>
      <span>{isChattingTabActive ? 'true' : 'false'}</span>
      <br />
      <span>{isUserListTabActive ? 'true' : 'false'}</span>
    </Container>
  );
}

export default MainScreen;
