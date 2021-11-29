import React, { useContext } from 'react';
import styled from 'styled-components';

import { MainStoreContext } from './MainStore';

import DropdownMenu from '../core/DropdownMenu';
import RightClickDropdown from '../core/RightClickDropdown';
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
      <RightClickDropdown
        isDropdownActivated={isDropdownOpen}
        setIsDropdownActivated={setIsDropdownOpen}
        pos={position}
      >
        {dropdownMenuList}
      </RightClickDropdown>
    </Container>
  );
}

export default MainDropdown;
