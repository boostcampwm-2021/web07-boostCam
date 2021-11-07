import React from 'react';
import styled from 'styled-components';

type DraggableProps = {
  children: React.ReactChild | React.ReactChild[];
  defaultPosition: {
    x: string;
    y: string;
    childHeight: string;
    childWidth: string;
  };
  isActive: boolean;
};

const Container = styled.div<{ x: string; y: string; width: string; height: string; isActive: boolean }>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  display: ${(props) => (props.isActive ? 'flex' : 'none')};
  left: ${(props) => props.x};
  top: ${(props) => props.y};
  position: absolute;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

function Draggable(props: DraggableProps): JSX.Element {
  const { children, defaultPosition, isActive } = props;
  const { x, y, childHeight, childWidth } = defaultPosition;
  let offsetX = 0;
  let offsetY = 0;

  const onDragStartInDraggable = (e: React.DragEvent<HTMLDivElement> & { target: HTMLDivElement }) => {
    offsetX = e.nativeEvent.offsetX;
    offsetY = e.nativeEvent.offsetY;
    e.target.style.opacity = '0.5';
  };
  const onDragEndInDraggable = (e: React.DragEvent<HTMLDivElement> & { target: HTMLDivElement }) => {
    const targetStyle = e.target.style;
    targetStyle.left = (e.pageX - offsetX).toString().concat('px');
    targetStyle.top = (e.pageY - offsetY).toString().concat('px');
    targetStyle.opacity = '1';
  };

  return (
    <Container
      draggable
      onDragStart={onDragStartInDraggable}
      onDragEnd={onDragEndInDraggable}
      width={childWidth}
      height={childHeight}
      x={x}
      y={y}
      isActive={isActive}
    >
      {children}
    </Container>
  );
}

export default Draggable;
