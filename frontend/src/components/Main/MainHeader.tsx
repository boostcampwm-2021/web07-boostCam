import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Dropdown from '../core/Dropdown';
import DropdownMenu from '../core/DropdownMenu';
import { MainStoreContext } from './MainStore';

const Container = styled.div`
  width: 100%;
  height: 50px;

  background-color: #321832;
`;

const HeaderBox = styled.div`
  width: 100%;
  height: 100%;
`;

const CurrentServerName = styled.span`
  color: #dcd6d0;
  font-size: 30px;
  margin-left: 20px;

  &:hover {
    cursor: pointer;
  }
`;

function MainHeader(): JSX.Element {
  const [isDropdownActivated, setIsDropdownActivated] = useState<boolean>(false);
  const {
    selectedServer,
    isServerInfoModalOpen,
    isServerSettingModalOpen,
    isQuitServerModalOpen,
    setIsServerInfoModalOpen,
    setIsServerSettingModalOpen,
    setIsQuitServerModalOpen,
  } = useContext(MainStoreContext);

  const onClickServerInfoButton = (e: React.MouseEvent<HTMLOrSVGElement>) => {
    if (selectedServer !== undefined) {
      e.stopPropagation();
      setIsDropdownActivated(!isDropdownActivated);
    }
  };

  useEffect(() => {}, []);
  return (
    <Container>
      <HeaderBox>
        <CurrentServerName onClick={onClickServerInfoButton}>
          {selectedServer !== undefined ? selectedServer.server.name : '새로운 서버에 참여하세요.'}
        </CurrentServerName>
        <Dropdown isDropdownActivated={isDropdownActivated} setIsDropdownActivated={setIsDropdownActivated}>
          <DropdownMenu
            name="서버 설정"
            setIsDropdownActivated={setIsDropdownActivated}
            state={isServerSettingModalOpen}
            stateSetter={setIsServerSettingModalOpen}
          />
          <DropdownMenu
            name="서버 정보"
            setIsDropdownActivated={setIsDropdownActivated}
            state={isServerInfoModalOpen}
            stateSetter={setIsServerInfoModalOpen}
          />
          <DropdownMenu
            name="서버 나가기"
            setIsDropdownActivated={setIsDropdownActivated}
            state={isQuitServerModalOpen}
            stateSetter={setIsQuitServerModalOpen}
          />
        </Dropdown>
      </HeaderBox>
    </Container>
  );
}

export default MainHeader;
