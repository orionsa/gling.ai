import { FC, useRef, useState } from 'react'
import { useRecoilValue } from 'recoil';
import { IconButton } from '@mui/material';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import { videoState } from '../../store/video';
import './VideoPlayer.scss';

export const VideoPlayer:FC = ()=> {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null)
  const src = useRecoilValue(videoState);

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current?.pause();
      setIsPlaying(false);
      return;
    }

    videoRef.current?.play();
    setIsPlaying(true);
  }

  return (
    <div className='video-player'>
      <video className='video-player__video-el' ref={videoRef}>
        <source src={src} type="video/mp4" />
      </video>

      <IconButton color="primary" onClick={handlePlayPause}>
        {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
      </IconButton>
    </div>
  )
}