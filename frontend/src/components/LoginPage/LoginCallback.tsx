import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import userState from '../../atoms/user';

import User from '../../types/user';

const Container = styled.div``;

const requestLogin = async (code: string, service: string): Promise<User> => {
  const response = await fetch(`/api/login/${service}?code=${code}`);
  if (!response.ok) {
    throw new Error(`${response.status}`);
  }
  const user: User = await response.json();
  return user;
};

type LoginCallbackProps = {
  service: 'github';
};

function LoginCallback(props: LoginCallbackProps): JSX.Element {
  const { service } = props;
  const [loading, setLoading] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [loggedInUser, setLoggedInUser] = useRecoilState(userState);

  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');

  if (!code) {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    const tryLogin = async () => {
      try {
        const user = await requestLogin(code, service);
        setLoggedInUser(user);
        setIsSuccess(true);
      } catch (e) {
        setIsSuccess(false);
      } finally {
        setLoading(false);
      }
    };

    tryLogin();
  }, [code]);

  if (loggedInUser || isSuccess) {
    return <Navigate to="/main" />;
  }

  if (loading) {
    return (
      <Container>
        <div>로그인 중...</div>
      </Container>
    );
  }

  return <Navigate to="/main" />;
}

export default LoginCallback;
