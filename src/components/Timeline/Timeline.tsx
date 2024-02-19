import { FC, MouseEvent } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { TimelineProps } from './Timeline.interface';
import { SingleClip } from './SingleClip';
import { clipsState, actionState, durationState, currentClipState, skippedSecondsState } from '../../store/video';
import { Clip } from '../../utils/shared.interface';
import './Timeline.scss';

const SEC_PX = 5;

export const Timeline:FC<TimelineProps> = ({ currentTime, onSeek }) => {
  const [clips, setClips] = useRecoilState(clipsState);
  const action = useRecoilValue(actionState);
  const [duration, setDuration] = useRecoilState(durationState);
  const [, setCurrentClip] = useRecoilState(currentClipState);
  const skippedSeconds = useRecoilValue(skippedSecondsState); 

  const handleClick = (event: MouseEvent<HTMLDivElement>, index:number): void => {
    switch(action) {
      case 'seek':
        handleSeek(event, index);
        break;
      case 'add breakpoint':
        addBreakpoint(event, index);
        break;
      case 'cut':
        removeClip(index);
        break;
    }
  }

  const handleSeek = (event: MouseEvent<HTMLDivElement>, index: number): void => {
    const secondToSeek = calcSecFromEvent(event, index);
    onSeek(secondToSeek);
    setCurrentClip(index)
  }

  const calcSecFromEvent = (event: MouseEvent<HTMLDivElement>, index: number): number => {
    const { pageX, currentTarget } = event;
    const { x } = currentTarget.getBoundingClientRect();
    const clip =  clips[index];
    const currentSec = Math.round((pageX - x) / SEC_PX) + clip[0];
    return currentSec;
  }

  const addBreakpoint = (event: MouseEvent<HTMLDivElement>, index: number): void => {
    const currentSec = calcSecFromEvent(event, index);
    const firstClip: Clip = [clips[index][0], currentSec];
    const secondClip: Clip = [currentSec + 1, clips[index][1]];
    const newClips = clips.toSpliced(index + 1, 0, secondClip);
    newClips[index] = firstClip;
    setClips(newClips);
  }

  const removeClip = (index: number): void => {
    if (clips.length === 1) {
      return;
    }
    
    const currentClip = clips[index];
    setClips(prev => prev.toSpliced(index, 1));
    setDuration(prev => prev - (currentClip[1] - currentClip[0]))
  }

  return (
    <div className='timeline'>
      <div className='timeline__clips' style={{ width: `${duration * SEC_PX}px` }}>
        {
          clips.map((clip, index) => (
            <SingleClip 
              key={`clip-${index}`} 
              index={index} 
              onClick={handleClick}
              widthPer={(((clip[1] - clip[0]) / 100) * 100)}
            />
          ))
        }
        <div 
          id="timeline-indicator" 
          className='timeline__clips__current-time' 
          style={{ 
            left: `${(currentTime - skippedSeconds) * SEC_PX}px`,
          }}
        />      
      </div>
    </div>
  )
}