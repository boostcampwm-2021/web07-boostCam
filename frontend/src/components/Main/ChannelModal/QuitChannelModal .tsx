import React, { useState, useContext, useEffect } from 'react';

import { MainStoreContext } from '../MainStore';
import { fetchData } from '../../../utils/fetchMethods';
import OkCancelModal from '../../common/OkCancelModal';

function QuitChannelModal(): JSX.Element {
  const { selectedServer, rightClickedChannelId, rightClickedChannelName, setIsModalOpen, getServerChannelList } =
    useContext(MainStoreContext);
  const [selectedChannelName, setSelectedChannelName] = useState<string>('');

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

  useEffect(() => {
    setSelectedChannelName(rightClickedChannelName);
  }, []);

  return (
    <OkCancelModal
      handleClickOk={handleClickOk}
      handleClickCancel={handleClickCancel}
      title="채널 나가기"
      description={`${selectedChannelName} 채널에서 나가시겠습니까?`}
    />
  );
}

export default QuitChannelModal;
