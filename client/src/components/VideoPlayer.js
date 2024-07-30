import React from 'react';

const VideoPlayer = ({ ipfsHash }) => {
  return (
    <div>
      <video width="600" controls>
        <source src={`https://ipfs.infura.io/ipfs/${ipfsHash}`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
