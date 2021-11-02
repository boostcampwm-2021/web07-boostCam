import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 99vw;
  height: 10vh;
  margin-top: 10px;
  background-color: gray;

  display: flex;
  flex-direction: row;
`;

const Button = styled.div`
  width: 150px;
  height: 150px;
  background-color: skyblue;
`;

type ButtonBarProps = {
  handleTab: { handleUserListTabActive: () => void; handleChattingTabActive: () => void };
};

function ButtonBar(props: ButtonBarProps): JSX.Element {
  const { handleTab } = props;
  const { handleUserListTabActive, handleChattingTabActive } = handleTab;
  return (
    <Container>
      <Button onClick={handleUserListTabActive}>UserListTab</Button>
      <Button onClick={handleChattingTabActive}>ChattingTab</Button>
    </Container>
  );
}

export default ButtonBar;
