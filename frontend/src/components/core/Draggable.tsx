import React from 'react';
import styled from 'styled-components';

type DraggableProps = {
  children: React.ReactChild | React.ReactChild[];
  defaultPosition: {
    x: string;
    y: string;
  };
  isActive: boolean;
};

const Container = styled.div<{ x: string; y: string; isActive: boolean }>`
  display: ${(props) => (props.isActive ? 'flex' : 'none')};
  left: ${(props) => props.x};
  top: ${(props) => props.y};
  position: absolute;
  flex-direction: row;
  &:hover {
    cursor: pointer;
  }
`;

function Draggable(props: DraggableProps): JSX.Element {
  const { children, defaultPosition, isActive } = props;
  const { x, y } = defaultPosition;
  let offsetX = 0;
  let offsetY = 0;

  const onDragStartInDraggable = (e: React.DragEvent<HTMLDivElement> & { target: HTMLDivElement }) => {
    offsetX = e.nativeEvent.offsetX;
    offsetY = e.nativeEvent.offsetY;
    e.target.style.opacity = '0.5';
  };
  const onDragEndInDraggable = (e: React.DragEvent<HTMLDivElement> & { target: HTMLDivElement }) => {
    const targetStyle = e.target.style;
    targetStyle.left = `${e.pageX - offsetX}px`;
    targetStyle.top = `${e.pageY - offsetY}px`;
    targetStyle.opacity = '1';
  };

  return (
    <Container
      draggable
      onDragStart={onDragStartInDraggable}
      onDragEnd={onDragEndInDraggable}
      x={x}
      y={y}
      isActive={isActive}
    >
      {children}
    </Container>
  );
}

export default Draggable;
