import React, { useContext } from 'react';
import styled from 'styled-components';

import type { Screen } from '../../types/cam';
import UserScreen from './UserScreen';
import LocalUserScreen from './LocalUserScreen';

const Container = styled.div<{ numOfRows: number }>`
  width: 90%;
  height: ${(props) => {
    if (props.numOfRows === 1) {
      return '100';
    }
    if (props.numOfRows === 2) {
      return '40';
    }
    return '30';
  }}%;
  max-height: 70vh;
  padding: 0 10px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  overflow-y: auto;
`;

type ScreenRowProps = {
  screenListOfRow: Array<Screen>;
  rowIndex: number;
  numOfRows: number;
};

const getScreenWidth = (numOfRows: number, lengthOfRow: number) => {
  if (numOfRows === 1) {
    return lengthOfRow === 0 ? '100%' : '40%';
  }
  if (numOfRows === 2) {
    return '40%';
  }
  return '30%';
};
function ScreenRow(props: ScreenRowProps): JSX.Element {
  const { screenListOfRow, rowIndex, numOfRows } = props;
  const screenWidth = getScreenWidth(numOfRows, screenListOfRow.length);

  return (
    <Container numOfRows={numOfRows}>
      {rowIndex === 0 ? <LocalUserScreen screenWidth={screenWidth} /> : ''}
      {screenListOfRow.map((screen: Screen) => (
        <UserScreen key={screen.userId} stream={screen.stream} userId={screen.userId} screenWidth={screenWidth} />
      ))}
    </Container>
  );
}

export default ScreenRow;
