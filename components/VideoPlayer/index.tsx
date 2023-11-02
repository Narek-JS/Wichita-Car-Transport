import YouTube from 'react-youtube';
import React from 'react';

interface VideoPlayerProps {
  videoId: string;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId }) => {
  const opts = {
    height: '396',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  return <YouTube videoId={videoId} opts={opts} />;
};

export { VideoPlayer };
