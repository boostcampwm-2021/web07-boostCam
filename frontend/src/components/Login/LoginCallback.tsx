import React, { useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';

import styled from 'styled-components';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #492148;
  display: flex;
  justify-content: center;
  padding-top: 100px;
  font-size: 36px;
  font-weight: bold;
  color: #eeeeee;
`;

const requestLogin = async (code: string, service: string): Promise<void> => {
  const response = await fetch(`/api/login/${service}?code=${code}`);
  if (!response.ok) {
    throw new Error(`${response.status}`);
  }
  await response.json();
};

type LoginCallbackProps = {
  service: 'github';
};

function LoginCallback(props: LoginCallbackProps): JSX.Element {
  const { service } = props;
  const [loading, setLoading] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [loginStatus, setLoginStatus] = useState<string>('로그인 중');
  const loginStatusRef = useRef('로그인 중');

  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');

  if (!code) {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    const tryLogin = async () => {
      try {
        await requestLogin(code, service);
        setIsSuccess(true);
      } catch (e) {
        setIsSuccess(false);
      } finally {
        setLoading(false);
      }
    };

    tryLogin();
  }, [code]);

  const changeLoginStatusMessage = () => {
    loginStatusRef.current += '.';
    if (loginStatusRef.current.length > 8) {
      loginStatusRef.current = loginStatusRef.current.substring(0, 5);
    }
    setLoginStatus(loginStatusRef.current);
  };

  useEffect(() => {
    const intervalId = setInterval(changeLoginStatusMessage, 200);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  if (isSuccess) {
    return <Navigate to="/main" />;
  }

  if (loading) {
    return (
      <Container>
        <div>{loginStatus}</div>
      </Container>
    );
  }

  return <Navigate to="/" />;
}

export default LoginCallback;
