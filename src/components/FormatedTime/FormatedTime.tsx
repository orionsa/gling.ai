import { FC, useEffect, useState } from 'react';

import { FormatedTimeProps } from './FormatedTime.interface';

export const FormatedTime:FC<FormatedTimeProps> =({ seconds }) => {
  const [time, setTime] = useState<string>('00:00');

  useEffect(() => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      setTime(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`)
  } else {
      setTime(`${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`);
  }

  }, [seconds])
  
  return (
    <span>
      {time}
    </span>
  )
}