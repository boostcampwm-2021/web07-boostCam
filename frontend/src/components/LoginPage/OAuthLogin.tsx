import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  aligh-items: center;
  width: 100%;
  max-width: 500px;
`;

const OAuthLoginButton = styled.div`
  width: 70%;
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
  const CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;
  const REDIRECT_URL = process.env.REACT_APP_GITHUB_REDIRECT_URL;

  const onClick = () => {
    const url = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}`;
    window.location.href = url;
  };

  return (
    <Container>
      <OAuthLoginButton onClick={onClick}>Github</OAuthLoginButton>
    </Container>
  );
}

export default OAuthLogin;
