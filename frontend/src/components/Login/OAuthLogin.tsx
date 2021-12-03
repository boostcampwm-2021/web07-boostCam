import React from 'react';
import styled from 'styled-components';
import { flex } from '../../utils/styledComponentFunc';
import { BoostCamMainIcons } from '../../utils/svgIcons';

const { Github } = BoostCamMainIcons;

const Container = styled.div`
  ${flex('row', 'center', 'center')}
  width: 100%;
  max-width: 500px;
`;

const OAuthLoginButton = styled.div`
  width: 70%;
  margin-top: 15px;
  height: 25px;
  background-color: #92508f;
  border-radius: 10px;
  padding: 8px 10px;
  cursor: pointer;
  text-align: center;
  box-shadow: 5px 3px 3px #7c7b7b;
  transition: all 0.3s;
  color: white;

  ${flex('row', 'center', 'center')};
`;

const GithubIcon = styled(Github)`
  width: 24px;
  margin: -3px 20px 0 0;
  position: absolute;
  left: -40px;
`;

const Content = styled.div`
  position: relative;
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
      <OAuthLoginButton onClick={onClick}>
        <Content>
          <GithubIcon />
          Log in with Github
        </Content>
      </OAuthLoginButton>
    </Container>
  );
}

export default OAuthLogin;
