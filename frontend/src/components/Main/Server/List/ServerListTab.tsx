import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { BoostCamMainIcons } from '../../../../utils/svgIcons';
import { MyServerData } from '../../../../types/main';
import { MainStoreContext } from '../../MainStore';
import Dropdown from '../../../core/Dropdown';
import DropdownMenu from '../../../core/DropdownMenu';
import CreateServerModal from '../Modal/CreateServerModal';
import JoinServerModal from '../Modal/JoinServerModal';
import { flex } from '../../../../utils/styledComponentFunc';

const { Plus } = BoostCamMainIcons;

const Container = styled.div`
  width: 80px;
  height: 100%;

  background-color: #492148;
  border-right: 1px solid #92508f;

  ${flex('column', 'flex-start', 'center')}
`;

const ServerIconBox = styled.div<{ selected: boolean }>`
  width: 60px;
  height: 60px;

  margin-top: 10px;
  box-sizing: border-box;
  ${(props) => (props.selected ? ' background-color:gray;' : '')}
  border-radius: 20px;

  ${flex('column', 'center', 'center')}
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
  background-color: white;
`;

const ServerName = styled.div`
  width: 55px;
  height: 55px;
  font-size: 40px;
  font-weight: bold;
  background-color: white;
  border-radius: 20px;
  text-align: center;
`;

const AddServerButton = styled.div`
  width: 60px;
  height: 60px;

  margin-top: 10px;

  ${flex('column', 'center', 'center')}

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

  const initChannel = '0';
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
                description: '생성할 서버의 이름과 설명을 작성해주세요.',
                height: '70%',
                minHeight: '520px',
              }}
            />
            <DropdownMenu
              name="서버 참가"
              setIsDropdownActivated={setIsDropdownActivated}
              modalContents={{
                contents: <JoinServerModal />,
                title: '서버 참가',
                description: '참가 코드를 입력하세요.',
                height: '45%',
                minHeight: '340px',
              }}
            />
          </Dropdown>
        </DropDownWrapper>
      </AddServerButton>
    </Container>
  );
}

export default ServerListTab;
