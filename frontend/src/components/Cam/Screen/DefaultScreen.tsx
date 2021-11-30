import styled from 'styled-components';

const Container = styled.div`
  width: 90%;
  max-height: 100%;
  display: flex;
  justify-content: center;
`;

const DefaultImg = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

function DefaultScreen(): JSX.Element {
  return (
    <Container>
      <DefaultImg src="/pepes/pepe-1.jpg" />
    </Container>
  );
}

export default DefaultScreen;
