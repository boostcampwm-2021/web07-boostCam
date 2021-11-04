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
  const { isChattingTabActive } = tabActive;

  const countActiveTab = (): string => {
    if (isChattingTabActive) return '70vw';
    return '98vw';
  };

  return <Container activeTab={countActiveTab()}>MainScreen</Container>;
}

export default MainScreen;
