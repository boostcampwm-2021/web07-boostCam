import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { deleteApi } from '../../../utils/fetchMethods';
import { MainStoreContext } from '../MainStore';

const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0px;
  right: 0px;

  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const ModalBackground = styled.div`
  position: fixed;
  left: 0px;
  right: 0px;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.5);
`;

const MessageFailToPost = styled.span`
  color: red;
  font-size: 16px;
  font-family: Malgun Gothic;
`;

const ModalBox = styled.div`
  position: relative;
  padding: 20px;
  width: 300px;
  height: 100px;
  background-color: #222322;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.span`
  color: #cbc4b9;
  font-size: 26px;
  font-weight: 600;
`;

const ButtonBox = styled.div`
  display: flex;
`;

const DeleteButton = styled.button`
  width: 80px;
  height: 30px;
  font-weight: bold;
  border: 0;
  outline: 0;
  text-align: center;
  vertical-align: middle;

  border-radius: 10px;
  background-color: red;
  cursor: pointer;
  &:hover {
    background-color: #ff3b1c;
  }
`;

const CancelButton = styled.button`
  width: 80px;
  height: 30px;
  font-weight: bold;
  border: 0;
  outline: 0;
  text-align: center;
  vertical-align: middle;

  border-radius: 10px;
  background-color: gray;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #888888;
  }
`;

type ServerDeleteCheckModalProps = {
  serverId: number;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
function ServerDeleteCheckModal(props: ServerDeleteCheckModalProps): JSX.Element {
  const { setIsDeleteModalOpen, serverId } = props;
  const { setIsModalOpen, getUserServerList } = useContext(MainStoreContext);
  const [messageFailToDelete, setMessageFailToDelete] = useState<string>('');

  const onClickDeleteServer = async () => {
    if (serverId) {
      const { statusCode, message } = await deleteApi(`api/servers/${serverId}`);

      if (statusCode === 204) {
        getUserServerList();
        setIsModalOpen(false);
      } else {
        setMessageFailToDelete(`${message}`);
      }
    }
  };

  return (
    <Container>
      <ModalBackground onClick={() => setIsDeleteModalOpen(false)} />
      <ModalBox>
        <Title>정말 삭제하시겠습니까?</Title>
        <MessageFailToPost>{messageFailToDelete}</MessageFailToPost>
        <ButtonBox>
          <DeleteButton onClick={onClickDeleteServer}>삭제</DeleteButton>
          <CancelButton onClick={() => setIsDeleteModalOpen(false)}>취소</CancelButton>
        </ButtonBox>
      </ModalBox>
    </Container>
  );
}

export default ServerDeleteCheckModal;
