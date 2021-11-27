import React, { useContext, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import userState from '../../atoms/user';
import Dropdown from '../core/Dropdown';
import DropdownMenu from '../core/DropdownMenu';
import { MainStoreContext } from './MainStore';
import QuitServerModal from './ServerModal/QuitServerModal';
import ServerInfoModal from './ServerModal/ServerInfoModal';
import ServerSettingModal from './ServerModal/ServerSettingModal';

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
  const { selectedServer } = useContext(MainStoreContext);
  const [isOwnerOfServer, setIsOwnerOfServer] = useState<boolean>(false);
  const user = useRecoilValue(userState);

  const onClickServerInfoButton = (e: React.MouseEvent<HTMLOrSVGElement>) => {
    if (selectedServer !== undefined) {
      e.stopPropagation();
      setIsDropdownActivated(!isDropdownActivated);
    }
  };

  useEffect(() => {
    if (selectedServer && user) {
      setIsOwnerOfServer(user.id === selectedServer.server.ownerId);
    }
  }, [selectedServer]);

  return (
    <Container>
      <HeaderBox>
        <CurrentServerName onClick={onClickServerInfoButton}>
          {selectedServer !== undefined ? selectedServer.server.name : '새로운 서버에 참여하세요.'}
        </CurrentServerName>
        <Dropdown isDropdownActivated={isDropdownActivated} setIsDropdownActivated={setIsDropdownActivated}>
          {isOwnerOfServer ? (
            <DropdownMenu
              name="서버 설정"
              setIsDropdownActivated={setIsDropdownActivated}
              modalContents={<ServerSettingModal />}
            />
          ) : (
            <></>
          )}
          <DropdownMenu
            name="서버 정보"
            setIsDropdownActivated={setIsDropdownActivated}
            modalContents={<ServerInfoModal />}
          />
          {isOwnerOfServer ? (
            <></>
          ) : (
            <DropdownMenu
              name="서버 나가기"
              setIsDropdownActivated={setIsDropdownActivated}
              modalContents={<QuitServerModal />}
            />
          )}
        </Dropdown>
      </HeaderBox>
    </Container>
  );
}

export default MainHeader;
