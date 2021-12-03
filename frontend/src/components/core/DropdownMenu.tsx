import React, { useContext } from 'react';
import styled from 'styled-components';
import ModalContents from '../../types/modal';
import { ToggleStoreContext } from '../Main/ToggleStore';

const Container = styled.li`
  border-bottom: 1px solid #dddddd;

  padding: 2px 5px;

  &:last-child {
    border: none;
  }
  &:hover {
    cursor: pointer;
    font-weight: bold;
  }
`;

type DropdownMenuProps = {
  name: string;
  setIsDropdownActivated: React.Dispatch<React.SetStateAction<boolean>>;
  modalContents: ModalContents;
};

function DropdownMenu(props: DropdownMenuProps): JSX.Element {
  const { setModalContents, setIsModalOpen } = useContext(ToggleStoreContext);
  const { name, setIsDropdownActivated, modalContents } = props;

  const onClickMenu = (e: React.MouseEvent<HTMLLIElement>) => {
    e.stopPropagation();
    setIsModalOpen(true);
    setIsDropdownActivated(false);
    setModalContents(modalContents);
  };

  return <Container onClick={onClickMenu}>{name}</Container>;
}

export default DropdownMenu;
