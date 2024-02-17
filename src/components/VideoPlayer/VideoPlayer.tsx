import { FC, useRef, useState, SyntheticEvent } from 'react'
import { useRecoilValue } from 'recoil';
import { IconButton } from '@mui/material';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import { videoState } from '../../store/video';
import { FormatedTime } from '../FormatedTime/FormatedTime';
import './VideoPlayer.scss';

export const VideoPlayer:FC = ()=> {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null)
  const src = useRecoilValue(videoState);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current?.pause();
      setIsPlaying(false);
      return;
    }

    videoRef.current?.play();
    setIsPlaying(true);
  }

  const handleTimeUpdate = (event: SyntheticEvent<HTMLVideoElement>) => {
    const { currentTime } = event.currentTarget;
    setCurrentTime(Math.round(currentTime));
  }

  const handleVideoLoad = (event: SyntheticEvent<HTMLVideoElement>) => {
    const { duration } = event.currentTarget;
    setDuration(Math.round(duration));
  }

  return (
    <div className='video-player'>
      <video 
        className='video-player__video-el' 
        ref={videoRef} 
        onTimeUpdate={handleTimeUpdate}
        onLoadedData={handleVideoLoad}
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className='video-player__bottom-panel'>
        <IconButton color="primary" onClick={handlePlayPause}>
          {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>
        <div className='video-player__bottom-panel__time'>
          <FormatedTime seconds={currentTime}/>
          <span>/</span> 
          <FormatedTime seconds={duration} />
        </div>
      </div>
    </div>
  )
}