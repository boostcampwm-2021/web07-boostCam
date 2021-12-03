import styled from 'styled-components';
import { flex } from '../../../utils/styledComponentFunc';

const Container = styled.div`
  width: 90%;
  max-height: 100%;
  ${flex('row', 'center')};
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
