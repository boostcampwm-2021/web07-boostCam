import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { useNavigate, Link } from 'react-router-dom';

import { Status } from '../../types/cam';
import socketState from '../../atoms/socket';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #009b9f;

  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const MainBox = styled.div`
  min-width: 600px;
  min-height: 450px;
  width: 50%;
  height: 50%;
  border: 2px solid #12cdd1;
  border-radius: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ListDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const RoomDiv = styled.div`
  width: 200px;
  padding: 10px 15px;
  border: 2px solid #12cdd1;
  border-radius: 10px;
  margin: 10px;
  cursor: pointer;

  &:hover {
    background-color: #12cdd1;
    transition: all 0.3s;
  }
`;

const Form = styled.form`
  width: 50%;
  height: 45%;
  border-radius: 20px;
  padding: 20px 0;
  margin: 30px 0;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const BoxTag = styled.span`
  font-size: 25px;
`;

const InputDiv = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  &:last-child {
    margin-top: 15px;
  }
`;

const Input = styled.input`
  border: none;
  outline: none;
  padding: 8px 10px;
  margin-top: 10px;
  border-radius: 10px;
`;

const SubmitButton = styled.button`
  width: 60%;
  margin-top: 15px;
  height: 35px;
  background: none;

  border: 0;
  outline: 0;

  border-radius: 10px;
  border: 2px solid #12cdd1;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s;

  &:hover {
    background-color: #12cdd1;
    transition: all 0.3s;
  }

  a {
    text-decoration: none;
  }
`;

type MapInfo = {
  userId: string;
  status: Status;
};

function CamRooms(): JSX.Element {
  const socket = useRecoilValue(socketState);
  const [roomList, setRoomList] = useState<JSX.Element[]>();
  const navigate = useNavigate();

  const onSumbitCreateForm = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const roomId = new FormData(e.currentTarget).get('roomid')?.toString().trim();
    if (!roomId) {
      return;
    }

    const response = await fetch('/api/cam/room/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        roomid: roomId,
      }),
    });

    socket.emit('changeRoomList');

    const { statusCode } = await response.json();
    if (statusCode === 201) navigate(`/cam?roomid=${roomId}`);
    // eslint-disable-next-line no-alert
    else if (statusCode === 500) alert('이미 존재하는 방 입니다.');
  };

  const onClickRoomDiv = (e: React.MouseEvent<HTMLDivElement>): void => {
    const { currentTarget } = e;
    const roomId = currentTarget.dataset.id;
    navigate(`/cam?roomid=${roomId}`);
  };

  const buildRoomList = (receivedRoomList: []) => {
    const roomListJSX = receivedRoomList.map((val: [string, MapInfo[]]): JSX.Element => {
      const roomId = val[0];
      const roomParticipant = val[1].length;
      return (
        <RoomDiv key={roomId} onClick={onClickRoomDiv} data-id={roomId}>
          <span>Room Id : {roomId}</span>
          <br />
          <span>User : {roomParticipant}</span>
        </RoomDiv>
      );
    });

    setRoomList(roomListJSX);
  };

  const receiveRoomList = async (): Promise<void> => {
    const response = await fetch('/api/cam/roomlist/');
    const { data } = await response.json();
    const { roomListJson } = data;

    const receivedRoomList = JSON.parse(roomListJson);
    buildRoomList(receivedRoomList);
  };

  useEffect(() => {
    socket.on('getRoomList', (receivedRoomList) => {
      buildRoomList(JSON.parse(receivedRoomList));
    });
    receiveRoomList();
  }, []);

  return (
    <Container>
      <MainBox>
        <Form onSubmit={onSumbitCreateForm}>
          <BoxTag>Create Room</BoxTag>
          <InputDiv>
            <Input name="roomid" placeholder="방 이름을 입력하세요" required />
          </InputDiv>
          <SubmitButton type="submit">Create</SubmitButton>
        </Form>
        <ListDiv>{roomList}</ListDiv>
        <Link to="/login">Login</Link>
      </MainBox>
    </Container>
  );
}

export default CamRooms;
