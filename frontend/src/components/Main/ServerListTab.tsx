import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { BoostCamMainIcons } from '../../utils/SvgIcons';
import { MyServerData } from '../../types/main';
import { MainStoreContext } from './MainStore';
import Dropdown from '../core/Dropdown';
import DropdownMenu from '../core/DropdownMenu';

const { Plus } = BoostCamMainIcons;

const Container = styled.div`
  width: 80px;
  height: 100%;

  background-color: #492148;
  border-right: 1px solid #92508f;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const ServerIconBox = styled.div<{ selected: boolean }>`
  width: 60px;
  height: 60px;

  margin-top: 10px;

  background-color: white;
  box-sizing: border-box;
  ${(props) => (props.selected ? 'border: 5px solid gray;' : '')}

  border-radius: 20px;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

const ServerImg = styled.div<{ imgUrl: string }>`
  width: 40px;
  height: 40px;
  background-image: url(${(props) => props.imgUrl});
  background-size: cover;
  background-repeat: no-repeat;
`;

const AddServerButton = styled.div`
  width: 60px;
  height: 60px;

  margin-top: 10px;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

const PlusIcon = styled(Plus)`
  width: 40px;
  height: 40px;
  fill: #a69c96;
`;

const tmpUrl: string[] = [
  'https://miro.medium.com/max/2000/0*wwsAZUu1oClOuat-.png',
  'https://miro.medium.com/max/2000/0*Jx_rwR_dmW4y1g-7.png',
  'https://kgo.googleusercontent.com/profile_vrt_raw_bytes_1587515358_10512.png',
];

function ServerListTab(): JSX.Element {
  const [isDropdownActivated, setIsDropdownActivated] = useState<boolean>(false);
  const {
    selectedServer,
    setSelectedServer,
    isCreateServerModalOpen,
    isJoinServerModalOpen,
    setIsCreateServerModalOpen,
    setIsJoinServerModalOpen,
    serverList,
    setServerList,
  } = useContext(MainStoreContext);

  const initChannel = '1';
  const navigate = useNavigate();

  const getServerList = async (): Promise<void> => {
    const response = await fetch(`/api/user/servers`);
    const list = await response.json();

    if (response.status === 200 && list.data.length !== 0) {
      setServerList(list.data);
      setSelectedServer(list.data[0]);
    }
  };

  const onClickServerAddButton = (e: React.MouseEvent<HTMLOrSVGElement>) => {
    e.stopPropagation();
    setIsDropdownActivated(!isDropdownActivated);
  };
  const listElements = serverList.map((myServerData: MyServerData, idx: number): JSX.Element => {
    const selected = selectedServer !== undefined ? selectedServer.id === myServerData.id : false;
    const onClickChangeSelectedServer = () => {
      setSelectedServer(myServerData);
    };

    return (
      <ServerIconBox
        key={myServerData.id}
        data-id={myServerData.id}
        selected={selected}
        onClick={onClickChangeSelectedServer}
      >
        <ServerImg imgUrl={tmpUrl[idx]} />
      </ServerIconBox>
    );
  });

  useEffect(() => {
    getServerList();
  }, []);

  useEffect(() => {
    const serverId = selectedServer !== undefined ? selectedServer.server.id : 'none';
    navigate({
      search: `?${createSearchParams({
        serverId,
        channelId: initChannel,
      })}`,
    });
  }, [selectedServer]);

  return (
    <Container>
      {listElements}
      <AddServerButton>
        <PlusIcon onClick={onClickServerAddButton} />
        <Dropdown isDropdownActivated={isDropdownActivated} setIsDropdownActivated={setIsDropdownActivated}>
          <DropdownMenu
            name="서버 생성"
            setIsDropdownActivated={setIsDropdownActivated}
            state={isCreateServerModalOpen}
            stateSetter={setIsCreateServerModalOpen}
          />
          <DropdownMenu
            name="서버 참가"
            setIsDropdownActivated={setIsDropdownActivated}
            state={isJoinServerModalOpen}
            stateSetter={setIsJoinServerModalOpen}
          />
        </Dropdown>
      </AddServerButton>
    </Container>
  );
}

export default ServerListTab;
