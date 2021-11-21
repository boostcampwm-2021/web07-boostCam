import React from 'react';
import styled from 'styled-components';

const Container = styled.li`
  border-bottom: 1px solid #dddddd;

  &:last-child {
    border: none;
  }
  &:hover {
    cursor: pointer;
    font-weight: bold;
  }
`;

type DropdownMenuProps = {
  setIsDropdownActivated: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  state: boolean;
  stateSetter: React.Dispatch<React.SetStateAction<boolean>>;
};

function DropdownMenu(props: DropdownMenuProps): JSX.Element {
  const { name, state, stateSetter, setIsDropdownActivated } = props;

  const onClickMenu = (e: React.MouseEvent<HTMLLIElement>) => {
    e.stopPropagation();
    stateSetter(!state);
    setIsDropdownActivated(false);
  };

  return <Container onClick={onClickMenu}>{name}</Container>;
}

export default DropdownMenu;
