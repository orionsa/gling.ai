import { FC, MouseEvent } from 'react';

import { Colors } from './Timeline.interface';
import { SingleClipProps } from './Timeline.interface';

export const SingleClip:FC<SingleClipProps> = ({ onClick, index, widthPer })=> {
  const handleClick = (event: MouseEvent<HTMLDivElement>): void => {
    onClick(event, index)
  };

  return (
    <div style={{ height: '85%', backgroundColor: Colors[index % 10], width: `${widthPer}%` }} onClick={handleClick}/>
  );
};
