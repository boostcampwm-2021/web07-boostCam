import ModalContents from './modal';

type ComponentInfo = {
  name: string;
  component: ModalContents;
};

type DropdownInfo = {
  position: [number, number];
  components: ComponentInfo[];
};

export type { ComponentInfo, DropdownInfo };
