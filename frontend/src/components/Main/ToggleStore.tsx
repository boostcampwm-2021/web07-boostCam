import { createContext, useState } from 'react';
import { DropdownInfo } from '../../types/dropdown';
import ModalContents from '../../types/modal';

export const ToggleStoreContext = createContext<React.ComponentState>(null);

type ToggleStoreProps = {
  children: React.ReactChild[] | React.ReactChild;
};

function ToggleStore(props: ToggleStoreProps): JSX.Element {
  const { children } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContents, setModalContents] = useState<ModalContents>({
    contents: <></>,
    title: '',
    description: '',
    height: '70%',
    minHeight: '450px',
  });
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [alertModalContents, setAlertModalContents] = useState<JSX.Element>(<></>);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownInfo, setDropdownInfo] = useState<DropdownInfo>({ position: [0, 0], components: [] });

  return (
    <ToggleStoreContext.Provider
      value={{
        isModalOpen,
        modalContents,
        setIsModalOpen,
        setModalContents,
        isDropdownOpen,
        setIsDropdownOpen,
        dropdownInfo,
        setDropdownInfo,
        isAlertModalOpen,
        setIsAlertModalOpen,
        alertModalContents,
        setAlertModalContents,
      }}
    >
      {children}
    </ToggleStoreContext.Provider>
  );
}

export default ToggleStore;
