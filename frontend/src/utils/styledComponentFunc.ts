type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
type JustifyContents =
  | 'left'
  | 'right'
  | 'center'
  | 'end'
  | 'space-around'
  | 'space-between'
  | 'space-evenly'
  | 'flex-start'
  | 'flex-end'
  | 'initial';
type AlignItems = 'start' | 'end' | 'center' | 'flex-start' | 'flex-end';

const flex = (direction: FlexDirection, justify?: JustifyContents, align?: AlignItems): string => {
  return `display:flex; flex-direction: ${direction}; 
    ${justify && `justify-content: ${justify}`};
    ${align && `align-items: ${align}`};`;
};

const customScroll = (): string => {
  return `&::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #999999;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: #cccccc;
    border-radius: 10px;
  }`;
};

export { flex, customScroll };
