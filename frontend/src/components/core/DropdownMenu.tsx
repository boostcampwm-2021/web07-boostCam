import React from 'react';
import styled from 'styled-components';

const Container = styled.li`
  border-bottom: 1px solid #dddddd;
  &:hover {
    cursor: pointer;
  }
`;

type DropdownMenuProps = {
  name: string;
};

function DropdownMenu(props: DropdownMenuProps): JSX.Element {
  const { name } = props;

  return <Container>{name}</Container>;
}

export default DropdownMenu;
