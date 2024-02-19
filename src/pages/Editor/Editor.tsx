import { FC, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { videoState } from '../../store/video';
import { VideoPlayer } from '../../components/VideoPlayer/VideoPlayer';
import "./Editor.scss";

export const Editor:FC = () => {
  const videoUrl = useRecoilValue(videoState);
  const navigate = useNavigate();
  
  useEffect(()=> {
    if(!videoUrl) {
      navigate('/upload')
    }
  }, [])

  return (
    <div className='editor'>
      <VideoPlayer />
    </div>
  )
}