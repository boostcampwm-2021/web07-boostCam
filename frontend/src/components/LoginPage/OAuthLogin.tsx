import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 40px;
  width: 100%;
  height: 45%;
`;

const DivTitle = styled.span`
  width: 80%;
  font-size: 15px;
  color: black;
`;

const ButtonDiv = styled.div`
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const OAuthLoginButton = styled.div`
  width: 80%;
  margin-top: 15px;
  height: 25px;
  background-color: #4ddddf;
  border-radius: 10px;
  padding: 5px 10px;
  cursor: pointer;
  text-align: center;
  box-shadow: 5px 3px 3px #7c7b7b;
  transition: all 0.3s;

  &:hover {
    padding: 8px 15px;
    transition: all 0.3s;
  }
`;

function OAuthLogin(): JSX.Element {
  const CLIENT_ID = 'b0e26b0f6a8f638ba3af';
  const REDIRECT_URL = 'http://localhost:3000/login';

  const onClick = () => {
    const url = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}`;
    window.location.href = url;
  };

  return (
    <Container>
      <DivTitle>OAuth Login</DivTitle>
      <ButtonDiv>
        <OAuthLoginButton onClick={onClick}>Github</OAuthLoginButton>
        <OAuthLoginButton>Google</OAuthLoginButton>
      </ButtonDiv>
    </Container>
  );
}

export default OAuthLogin;
