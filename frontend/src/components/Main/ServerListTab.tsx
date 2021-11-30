import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { BoostCamMainIcons } from '../../utils/SvgIcons';
import { MyServerData } from '../../types/main';
import { MainStoreContext } from './MainStore';
import Dropdown from '../core/Dropdown';
import DropdownMenu from '../core/DropdownMenu';
import CreateServerModal from './ServerModal/CreateServerModal';
import JoinServerModal from './ServerModal/JoinServerModal';

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
  width: 55px;
  height: 55px;
  background-image: url(${(props) => props.imgUrl});
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 20px;
  position: fixed;
`;

const ServerName = styled.div`
  width: 55px;
  height: 55px;
  font-size: 40px;
  font-weight: bold;
  background-color: white;
  border-radius: 20px;
  text-align: center;
  position: fixed;
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

const DropDownWrapper = styled.div`
  position: absolute;
`;

function ServerListTab(): JSX.Element {
  const [isDropdownActivated, setIsDropdownActivated] = useState<boolean>(false);
  const { selectedServer, setSelectedServer, serverList } = useContext(MainStoreContext);

  const initChannel = '1';
  const navigate = useNavigate();

  const onClickServerAddButton = (e: React.MouseEvent<HTMLOrSVGElement>) => {
    e.stopPropagation();
    setIsDropdownActivated(!isDropdownActivated);
  };
  const listElements = serverList.map((myServerData: MyServerData): JSX.Element => {
    const selected = selectedServer !== undefined ? selectedServer.id === myServerData.id : false;
    const onClickChangeSelectedServer = () => {
      setSelectedServer(myServerData);
    };
    const { server } = myServerData;
    const { imgUrl, name } = server;

    return (
      <ServerIconBox
        key={myServerData.id}
        data-id={myServerData.id}
        selected={selected}
        onClick={onClickChangeSelectedServer}
      >
        {imgUrl ? <ServerImg imgUrl={imgUrl} /> : <ServerName>{name[0]}</ServerName>}
      </ServerIconBox>
    );
  });

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
        <DropDownWrapper>
          <Dropdown isDropdownActivated={isDropdownActivated} setIsDropdownActivated={setIsDropdownActivated}>
            <DropdownMenu
              name="서버 생성"
              setIsDropdownActivated={setIsDropdownActivated}
              modalContents={{
                contents: <CreateServerModal />,
                title: '서버 생성',
                description: '선택한 채널에 대한 내용을 변경할 수 있습니다.',
              }}
            />
            <DropdownMenu
              name="서버 참가"
              setIsDropdownActivated={setIsDropdownActivated}
              modalContents={{
                contents: <JoinServerModal />,
                title: '서버 참가',
                description: '선택한 채널에 대한 내용을 변경할 수 있습니다.',
              }}
            />
          </Dropdown>
        </DropDownWrapper>
      </AddServerButton>
    </Container>
  );
}

export default ServerListTab;
