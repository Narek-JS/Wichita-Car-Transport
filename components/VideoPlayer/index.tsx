import React from 'react';
import YouTube from 'react-youtube';

interface VideoPlayerProps {
  videoId: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId }) => {
  const opts = {
    height: '396',
    width: '100%',
    playerVars: {
      // Add any YouTube player variables you need (e.g., autoplay, controls, etc.)
      autoplay: 1,
    },
  };

  return <YouTube videoId={videoId} opts={opts} />;
};

export { VideoPlayer };
