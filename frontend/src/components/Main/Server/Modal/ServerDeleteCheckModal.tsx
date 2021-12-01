import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { deleteApi } from '../../../../utils/fetchMethods';
import { flex } from '../../../../utils/styledComponentFunc';
import { MainStoreContext } from '../../MainStore';

const MessageFailToPost = styled.span`
  color: red;
  font-size: 16px;
  font-family: Malgun Gothic;
`;

const Container = styled.div`
  position: relative;
  padding: 20px;
  width: 300px;
  height: 100px;
  background-color: #222322;
  border-radius: 10px;

  ${flex('column', 'space-between')}
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
};
function ServerDeleteCheckModal(props: ServerDeleteCheckModalProps): JSX.Element {
  const { serverId } = props;
  const { setIsModalOpen, setIsAlertModalOpen, getUserServerList } = useContext(MainStoreContext);
  const [messageFailToDelete, setMessageFailToDelete] = useState<string>('');

  const onClickDeleteServer = async () => {
    if (serverId) {
      const { statusCode, message } = await deleteApi(`/api/servers/${serverId}`);

      if (statusCode === 204) {
        getUserServerList();
        setIsModalOpen(false);
        setIsAlertModalOpen(false);
      } else {
        setMessageFailToDelete(`${message}`);
      }
    }
  };

  return (
    <Container>
      <Title>정말 삭제하시겠습니까?</Title>
      <MessageFailToPost>{messageFailToDelete}</MessageFailToPost>
      <ButtonBox>
        <DeleteButton onClick={onClickDeleteServer}>삭제</DeleteButton>
        <CancelButton onClick={() => setIsAlertModalOpen(false)}>취소</CancelButton>
      </ButtonBox>
    </Container>
  );
}

export default ServerDeleteCheckModal;
