import React, { useState, useRef } from 'react';

export const VideoPlayer = ({ src }) => {
  const [videoAvailable, setVideoAvailable] = useState(true);
  const videoRef = useRef(null);

  const handleError = () => {
    setVideoAvailable(false);
  };

  // Function to check if the URL is a YouTube link
  const isYouTubeLink = (url) => {
    const youtubeRegex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
    return youtubeRegex.test(url);
  };

  return (
    <div className="w-full h-64 relative bg-gray-200 flex items-center justify-center">
      {videoAvailable ? (
        isYouTubeLink(src) ? (
          // Embed YouTube video if it's a YouTube link
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${src.split('v=')[1]}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onError={handleError}
          ></iframe>
        ) : (
          // Play regular video file if it's not a YouTube link
          <video
            className="w-full h-full object-cover"
            controls
            ref={videoRef}
            onError={handleError}
          >
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-center text-red-600">
          Video not available
        </div>
      )}
    </div>
  );
};
