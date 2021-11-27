type ComponentInfo = {
  name: string;
  component: JSX.Element;
};

type DropdownInfo = {
  position: [number, number];
  components: ComponentInfo[];
};

export type { ComponentInfo, DropdownInfo };
