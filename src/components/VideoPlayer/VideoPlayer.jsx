import React, { useState } from 'react';
import { FiPlay } from 'react-icons/fi';
import './VideoPlayer.css';

const VideoPlayer = ({
  title = '探索企业数字化未来',
  description = '了解我们如何通过技术创新帮助企业实现数字化转型，提升业务效率与竞争力。',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className="video-player">
      <div className="video-player__wrapper">
        {!isPlaying ? (
          <div className="video-player__thumbnail">
            <div className="video-player__overlay">
              <button
                className="video-player__play-btn"
                onClick={handlePlay}
                aria-label="播放视频"
              >
                <FiPlay className="video-player__play-icon" />
              </button>
            </div>
            <div className="video-player__info">
              <h3 className="video-player__title">{title}</h3>
              <p className="video-player__description">{description}</p>
            </div>
          </div>
        ) : (
          <div className="video-player__active">
            <div className="video-player__placeholder-video">
              <div className="video-player__playing-indicator">
                <div className="video-player__bar"></div>
                <div className="video-player__bar"></div>
                <div className="video-player__bar"></div>
                <div className="video-player__bar"></div>
              </div>
              <p className="video-player__playing-text">视频播放中...</p>
              <button
                className="btn btn--outline video-player__close-btn"
                onClick={() => setIsPlaying(false)}
              >
                关闭
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
