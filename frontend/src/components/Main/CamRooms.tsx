import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #c4c4c4;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const MainBox = styled.div`
  min-width: 700px;
  min-height: 600px;
  background-color: skyblue;
  border-radius: 20px;

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const DivForm = styled.form`
  width: 50%;
  height: 45%;
  background-color: skyblue;
  border-radius: 20px;

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
  justify-content: flex-start;
  &:last-child {
    margin-top: 15px;
  }
`;

const InputTag = styled.span`
  width: 100%;
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
  background-color: #4ddddf;

  border: 0;
  outline: 0;

  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  box-shadow: 5px 3px 3px #7c7b7b;
  transition: all 0.3s;

  &:hover {
    background-color: #26f5f8;
    transition: all 0.3s;
  }

  a {
    text-decoration: none;
  }
`;

type UserInfo = {
  roomId: number | null;
  nickname: string | null;
};

type CamRoomsProps = {
  handleUserInfo: React.Dispatch<React.SetStateAction<UserInfo | null>>;
};

function CamRooms({ handleUserInfo }: CamRoomsProps): JSX.Element {
  const navigate = useNavigate();
  const onSumbitCreateForm = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { currentTarget } = e;
    const formData: FormData = new FormData(currentTarget);
    const receivedData: UserInfo = { nickname: null, roomId: null };
    formData.forEach((val, key) => {
      if (key === 'nickname') receivedData.nickname = val.toString().trim();
      if (key === 'roomid') receivedData.roomId = parseInt(val.toString(), 10);
    });

    const { nickname, roomId } = receivedData;

    if (nickname === null || !nickname.length || Number.isNaN(roomId)) return;
    console.log(receivedData);
    handleUserInfo(receivedData);
    navigate(`/cam`);
  };

  const onSumbitJoinForm = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { currentTarget } = e;
    const formData: FormData = new FormData(currentTarget);

    formData.forEach((val) => {
      console.log(val);
    });
    navigate(`/cam`);
  };

  return (
    <Container>
      <MainBox>
        <DivForm onSubmit={onSumbitCreateForm}>
          <BoxTag>Create Room</BoxTag>
          <InputDiv>
            <InputTag>Nickname</InputTag>
            <Input name="nickname" placeholder="닉네임을 입력하세요" />
          </InputDiv>
          <InputDiv>
            <InputTag>Room Number</InputTag>
            <Input name="roomid" placeholder="방 번호를 입력하세요" />
          </InputDiv>
          <SubmitButton type="submit">Create</SubmitButton>
        </DivForm>
        <DivForm onSubmit={onSumbitJoinForm}>
          <BoxTag>Join Room</BoxTag>
          <InputDiv>
            <InputTag>Nickname</InputTag>
            <Input name="nickname" placeholder="닉네임을 입력하세요" />
          </InputDiv>
          <InputDiv>
            <InputTag>Room Number</InputTag>
            <Input name="roomid" placeholder="방 번호를 입력하세요" />
          </InputDiv>
          <SubmitButton type="submit">Join</SubmitButton>
        </DivForm>
      </MainBox>
    </Container>
  );
}

export default CamRooms;
