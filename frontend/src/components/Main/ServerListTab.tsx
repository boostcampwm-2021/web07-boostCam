import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { BoostCamMainIcons } from '../../utils/SvgIcons';

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

// border: 5px solid ${(props) => (props.selected ? 'gray' : 'white')};

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

type User = {
  githubId: string;
  id: string;
  nickname: string;
  profile: string;
};

type ServerListData = {
  description: string;
  id: string;
  name: string;
  owner: User;
};

const tmpUrl: string[] = [
  'https://miro.medium.com/max/2000/0*wwsAZUu1oClOuat-.png',
  'https://miro.medium.com/max/2000/0*Jx_rwR_dmW4y1g-7.png',
  'https://kgo.googleusercontent.com/profile_vrt_raw_bytes_1587515358_10512.png',
];

function ServerListTab(): JSX.Element {
  const [serverList, setServerList] = useState<JSX.Element[]>();
  const currentServer = '1';

  const buildServerListIcons = async () => {
    const response = await fetch('/api/server/list');
    const list = await response.json();

    const listElements = list.data.map((val: ServerListData, idx: number): JSX.Element => {
      const flag = currentServer === val.id;
      return (
        <ServerIconBox key={val.id} data-id={val.id} selected={flag}>
          <ServerImg imgUrl={tmpUrl[idx]} />
        </ServerIconBox>
      );
    });

    setServerList(listElements);
  };

  useEffect(() => {
    buildServerListIcons();
  }, []);

  return (
    <Container>
      {serverList}
      <AddServerButton>
        <PlusIcon />
      </AddServerButton>
    </Container>
  );
}

export default ServerListTab;
