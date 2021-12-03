import React, { useContext } from 'react';
import { fetchData } from '../../../../utils/fetchMethods';
import OkCancelModal from '../../../core/OkCancelModal';
import { MainStoreContext } from '../../MainStore';
import { ToggleStoreContext } from '../../ToggleStore';

type CamDeleteModalProps = {
  camId: number;
};

function CamDeleteModal(props: CamDeleteModalProps): JSX.Element {
  const { camId } = props;
  const { getServerCamList } = useContext(MainStoreContext);
  const { setIsModalOpen } = useContext(ToggleStoreContext);

  const handleClickOk = async () => {
    // 추후 status code에 따른 error landing 방법을 다른 모달까지 한꺼번에 구현해야합니다.
    await fetchData<null, null>('DELETE', `/api/cam/${camId}`);
    getServerCamList();
    setIsModalOpen(false);
  };

  const handleClickCancel = () => {
    setIsModalOpen(false);
  };

  return <OkCancelModal handleClickOk={handleClickOk} handleClickCancel={handleClickCancel} />;
}

export default CamDeleteModal;
