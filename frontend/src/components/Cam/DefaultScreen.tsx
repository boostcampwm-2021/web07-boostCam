import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
`;

const DefaultImg = styled.img`
  width: 100%;
`;

function DefaultScreen(): JSX.Element {
  return (
    <Container>
      <DefaultImg src="/user-default.jpg" />
    </Container>
  );
}

export default DefaultScreen;
