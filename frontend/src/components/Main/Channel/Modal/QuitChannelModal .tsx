import React, { useContext } from 'react';

import { MainStoreContext } from '../../MainStore';
import { fetchData } from '../../../../utils/fetchMethods';
import OkCancelModal from '../../../core/OkCancelModal';

function QuitChannelModal(): JSX.Element {
  const { selectedServer, rightClickedChannelId, setIsModalOpen, getServerChannelList } = useContext(MainStoreContext);

  const handleClickOk = async () => {
    await fetchData<null, null>(
      'DELETE',
      `/api/user/servers/${selectedServer.server.id}/channels/${rightClickedChannelId}`,
    );
    getServerChannelList();
    setIsModalOpen(false);
  };

  const handleClickCancel = () => {
    setIsModalOpen(false);
  };
  return <OkCancelModal handleClickOk={handleClickOk} handleClickCancel={handleClickCancel} />;
}

export default QuitChannelModal;
