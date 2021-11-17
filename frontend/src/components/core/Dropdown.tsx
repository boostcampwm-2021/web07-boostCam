import React from 'react';
import styled from 'styled-components';

const Container = styled.div<{ activated: boolean }>`
  background-color: white;
  border-radius: 8px;
  position: relative;
  top: 60px;
  right: 0;
  width: 300px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  opacity: ${(props) => (props.activated ? 1 : 0)};
  visibility: ${(props) => (props.activated ? 'visible' : 'hidden')};
  transform: translateY(${(props) => (props.activated ? '0' : '-20')}px);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

type DropdownProps = {
  isDropdownActivated: boolean;
  children: React.ReactChild[] | React.ReactChild;
};
function Dropdown(props: DropdownProps): JSX.Element {
  const { isDropdownActivated, children } = props;

  return (
    <Container activated={isDropdownActivated}>
      <MenuList>{children}</MenuList>
    </Container>
  );
}

export default Dropdown;
