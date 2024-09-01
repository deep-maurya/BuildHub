import React, { useState, useRef } from 'react';

export const VideoPlayer = ({ src }) => {
  const [videoAvailable, setVideoAvailable] = useState(true);
  const videoRef = useRef(null);

  const handleError = () => {
    setVideoAvailable(false);
  };

  return (
    <div className="w-full h-64 relative bg-gray-200 flex items-center justify-center">
      {videoAvailable ? (
        <video
          className="w-full h-full object-cover"
          controls
          ref={videoRef}
          onError={handleError}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-center text-red-600">
          Video not available
        </div>
      )}
    </div>
  );
};
