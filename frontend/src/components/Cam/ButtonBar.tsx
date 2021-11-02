import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 98vw;
  height: 8vh;
  margin-top: 5px;
  background-color: gray;

  display: flex;
  flex-direction: row;
`;

const Button = styled.div`
  width: 8vh;
  height: 8vh;
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
