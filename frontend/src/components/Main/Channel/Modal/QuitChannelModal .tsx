import React, { useContext } from 'react';

import { MainStoreContext } from '../../MainStore';
import { fetchData } from '../../../../utils/fetchMethods';
import OkCancelModal from '../../../core/OkCancelModal';
import { ToggleStoreContext } from '../../ToggleStore';

function QuitChannelModal(): JSX.Element {
  const { selectedServer, rightClickedChannelId, getServerChannelList } = useContext(MainStoreContext);
  const { setIsModalOpen } = useContext(ToggleStoreContext);

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
