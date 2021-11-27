import React, { useContext } from 'react';
import styled from 'styled-components';

import ServerListTab from './ServerListTab';
import MainSection from './MainSection';
import { MainStoreContext } from './MainStore';
import MainModal from './MainModal';

import DropdownMenu from '../core/DropdownMenu';
import Dropdown2 from '../core/Dropdown2';
import { ComponentInfo } from '../../types/dropdown';

const Container = styled.div``;

function MainDropdown(): JSX.Element {
  const { isDropdownOpen, setIsDropdownOpen, dropdownInfo } = useContext(MainStoreContext);
  const { position, components } = dropdownInfo;

  const dropdownMenuList = components.map((val: ComponentInfo) => {
    const { name, component } = val;
    return <DropdownMenu key={name} name={name} setIsDropdownActivated={setIsDropdownOpen} modalContents={component} />;
  });

  return (
    <Container>
      <Dropdown2 isDropdownActivated={isDropdownOpen} setIsDropdownActivated={setIsDropdownOpen} pos={position}>
        {dropdownMenuList}
      </Dropdown2>
    </Container>
  );
}

export default MainDropdown;
