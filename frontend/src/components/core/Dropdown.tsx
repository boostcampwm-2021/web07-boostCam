import React, { SetStateAction } from 'react';
import styled from 'styled-components';

const Container = styled.div<{ activated: boolean }>`
  position: absolute;
  opacity: ${(props) => (props.activated ? 1 : 0)};
  visibility: ${(props) => (props.activated ? 'visible' : 'hidden')};
  transform: translateY(${(props) => (props.activated ? '0' : '-20')}px);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
`;

const DropdownBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 200vw;
  height: 200vh;
  margin-left: -50vw;
  margin-top: -50vh;
  background-color: rgb(0, 0, 0, 0.1);
  z-index: 3;
`;

const InnerContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  position: relative;
  width: 80px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  z-index: 99;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

type DropdownProps = {
  isDropdownActivated: boolean;
  setIsDropdownActivated: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactChild[] | React.ReactChild;
};
function Dropdown(props: DropdownProps): JSX.Element {
  const { isDropdownActivated, setIsDropdownActivated, children } = props;

  const onClickDropdownBackground = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    console.log('background');
    setIsDropdownActivated(false);
  };

  return (
    <Container activated={isDropdownActivated}>
      <InnerContainer>
        <MenuList>{children}</MenuList>
      </InnerContainer>
      <DropdownBackground onClick={onClickDropdownBackground} />
    </Container>
  );
}

export default Dropdown;
