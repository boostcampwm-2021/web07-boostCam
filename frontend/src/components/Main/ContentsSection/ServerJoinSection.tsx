import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { fetchData } from '../../../utils/fetchMethods';
import { MainStoreContext } from '../MainStore';

const Container = styled.div`
  width: 100%;
  height: 100%;
  color: #dcd6d0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.span`
  font-size: 36px;
  margin-bottom: 20px;
`;
const SubTitle = styled.span`
  margin-bottom: 10px;
`;
const CodeBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;
const ServerCode = styled.input`
  width: 200px;
  height: 30px;
  border-radius: 10px;
  font-weight: bold;
  outline: none;
  border: none;
`;
const PostCode = styled.button`
  width: 60px;
  height: 32px;
  background-color: #26a9ca;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  margin-left: 10px;
  &:hover {
    background-color: #2dc2e6;
    cursor: pointer;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  height: 20px;
  font-size: 16px;
  font-family: Malgun Gothic;
`;

function ServerJoinSection(): JSX.Element {
  const { getUserServerList } = useContext(MainStoreContext);
  const [serverCode, setServerCode] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const onclickParticipateToServer = async () => {
    const url = `/api/user/servers`;
    const body = { code: serverCode };

    if (!serverCode) {
      setErrorMessage('참가 코드를 입력하세요.');
      return;
    }

    const { statusCode, message } = await fetchData('POST', url, body);
    if (statusCode === 201) {
      getUserServerList();
    } else {
      setErrorMessage(`${message}`);
    }
  };

  return (
    <Container>
      <Title>참가중인 서버가 없습니다.</Title>
      <SubTitle>서버 참가 코드를 입력하세요.</SubTitle>
      <CodeBox>
        <ServerCode onChange={(e) => setServerCode(e.target.value)} />
        <PostCode type="button" onClick={onclickParticipateToServer}>
          참가
        </PostCode>
      </CodeBox>
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </Container>
  );
}

export default ServerJoinSection;
