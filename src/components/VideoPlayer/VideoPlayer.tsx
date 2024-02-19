import { FC, useRef, useState, SyntheticEvent } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil';
import { IconButton } from '@mui/material';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import { videoState, clipsState, durationState, seekMapState, currentClipState } from '../../store/video';
import { FormatedTime } from '../FormatedTime/FormatedTime';
import { Timeline } from '../Timeline/Timeline';
import { ActionsPanel } from '../ActionsPanel/ActionsPanel';
import { PageLoading } from '../PageLoading/PageLoading'; 
import './VideoPlayer.scss';

export const VideoPlayer:FC = ()=> {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  let videoRef = useRef<HTMLVideoElement | null>(null)
  const src = useRecoilValue(videoState);
  const [duration, setDuration] = useRecoilState(durationState);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [clips, setClips] = useRecoilState(clipsState);
  const seekMap = useRecoilValue(seekMapState);
  const [, setCurrentClip] = useRecoilState(currentClipState);
  const [isLoading, setLoader] = useState(true);

  const handlePlayPause = (): void => {
    if (isPlaying) {
      videoRef.current?.pause();
      setIsPlaying(false);
      return;
    }

    videoRef.current?.play();
    setIsPlaying(true);
  }

  const handleTimeUpdate = (event: SyntheticEvent<HTMLVideoElement>): void => {
    const { currentTime: playerCurrentTime } = event.currentTarget;
    const rounded = Math.round(playerCurrentTime);
    if (rounded === currentTime) {
      return;
    }
    setCurrentTime(rounded);
    if (seekMap.has(rounded - 1)) {
      setCurrentClip(prev => prev + 1);
      handleSeek(seekMap.get(rounded - 1)!);
    }
  }

  const handleVideoLoad = (event: SyntheticEvent<HTMLVideoElement>): void => {
    const { duration } = event.currentTarget;
    const rounded = Math.round(duration); 
    setDuration(rounded);
    setClips([[0, rounded]]);
    setLoader(false);
  }

  const handleSeek = (second:number): void => {
    if (videoRef.current) {
      videoRef.current.currentTime = second;
    }
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
      <ActionsPanel actions={['seek', 'cut', 'add breakpoint']} />
      <Timeline currentTime={currentTime} onSeek={handleSeek}/>
      <PageLoading isLoading={isLoading} />
    </div>
  )
}