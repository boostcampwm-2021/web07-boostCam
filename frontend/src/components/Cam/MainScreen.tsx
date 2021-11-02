import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div<{ activeTab: string }>`
  width: ${(props) => props.activeTab};
  height: 80vh;
  background-color: gray;
`;
// ${(props) => (props.chattingTab ? 'red' : 'blue')}

type MainScreenProps = {
  tabActive: { isUserListTabActive: boolean; isChattingTabActive: boolean };
};

function MainScreen(props: MainScreenProps): JSX.Element {
  const { tabActive } = props;
  const { isChattingTabActive, isUserListTabActive } = tabActive;

  const countActiveTab = (): string => {
    if (isChattingTabActive && isUserListTabActive) return '60vw';
    if (isChattingTabActive || isUserListTabActive) return '80vw';
    return '100vw';
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
