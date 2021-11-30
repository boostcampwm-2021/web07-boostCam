import React, { useContext } from 'react';

import { MainStoreContext } from '../MainStore';
import fetchData from '../../../utils/fetchMethods';
import OkCancelModal from '../../common/OkCancelModal';

function QuitChannelModal(): JSX.Element {
  const { rightClickedChannelId, setIsModalOpen, getServerChannelList } = useContext(MainStoreContext);

  const handleClickOk = async () => {
    await fetchData<null, null>('DELETE', `/api/user/servers/${rightClickedChannelId}/channels`);
    getServerChannelList();
    setIsModalOpen(false);
  };

  const handleClickCancel = () => {
    setIsModalOpen(false);
  };
  return <OkCancelModal handleClickOk={handleClickOk} handleClickCancel={handleClickCancel} />;
}

export default QuitChannelModal;
