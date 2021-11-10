import React, { useRef } from 'react';
import styled from 'styled-components';

import ButtonBar from './ButtonBar';
import ChattingTab from './ChattingTab';
import MainScreen from './MainScreen';
import CamStore from './CamStore';
import UserListTab from './UserListTab';
import ToggleStore from './ToggleStore';
import { UserInfo } from '../../types/cam';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-x: hidden;
  overflow-y: hidden;
  background-color: black;
`;

const UpperTab = styled.div`
  margin-top: 5px;
  width: 98vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

type CamProps = {
  userInfo: UserInfo;
};

function Cam(props: CamProps): JSX.Element {
  const { userInfo } = props;
  const camRef = useRef<HTMLDivElement>(null);

  return (
    <Container ref={camRef}>
      <CamStore userInfo={userInfo}>
        <ToggleStore camRef={camRef}>
          <UpperTab>
            <MainScreen />
            <UserListTab />
            <ChattingTab />
          </UpperTab>
          <ButtonBar />
        </ToggleStore>
      </CamStore>
    </Container>
  );
}

export default Cam;
