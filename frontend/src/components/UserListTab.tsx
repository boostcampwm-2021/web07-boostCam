import React, { useState, useEffect, useRef } from 'react';

function UserListTab() {
  const localVideoRef = useRef<HTMLVideoElement>(null);

  const getUserMedia = async () => {
    const media = await navigator.mediaDevices.getUserMedia({ video: true });
    return media;
  };

  useEffect(() => {
    const init = async () => {
      const media = await getUserMedia();
      if (!localVideoRef.current) {
        return;
      }
      localVideoRef.current.srcObject = media;
    };
    init();
  }, []);

  return (
    <div>
      <video ref={localVideoRef} playsInline autoPlay>
        <track kind="captions" />
      </video>
    </div>
  );
}

export default UserListTab;
