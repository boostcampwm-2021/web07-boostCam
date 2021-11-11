import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import ButtonBar from './ButtonBar';
import ChattingTab from './ChattingTab';
import MainScreen from './MainScreen';
import CamStore from './CamStore';
import UserListTab from './UserListTab';
import ToggleStore from './ToggleStore';
import { UserInfo } from '../../types/cam';
import socketState from '../../atoms/socket';
import STTStore from './STT/STTStore';

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
  userInfo: UserInfo | null;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
};

function Cam(props: CamProps): JSX.Element {
  const { userInfo, setUserInfo } = props;

  const socket = useRecoilValue(socketState);
  const camRef = useRef<HTMLDivElement>(null);

  const onSubmitNicknameForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { currentTarget } = e;
    const formData: FormData = new FormData(currentTarget);
    const receivedData: UserInfo = { nickname: null, roomId: null };
    formData.forEach((val, key) => {
      if (key === 'nickname') receivedData.nickname = val.toString().trim();
    });
    setUserInfo(receivedData);
  };

  useEffect(() => {
    return () => {
      socket.emit('exitRoom');
    };
  }, []);

  return (
    <Container ref={camRef}>
      {!userInfo?.nickname ? (
        <div>
          <form onSubmit={onSubmitNicknameForm}>
            <input name="nickname" placeholder="닉네임을 입력해주세요" required />
            <button type="submit">입력</button>
          </form>
        </div>
      ) : (
        <CamStore userInfo={userInfo}>
          <ToggleStore camRef={camRef}>
            <STTStore>
              <UpperTab>
                <MainScreen />
                <UserListTab />
                <ChattingTab />
              </UpperTab>
              <ButtonBar />
            </STTStore>
          </ToggleStore>
        </CamStore>
      )}
    </Container>
  );
}

export default Cam;
