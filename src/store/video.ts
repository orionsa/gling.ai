import { atom, selector } from 'recoil';

import { Clip } from '../utils/shared.interface';

export const videoState = atom<string>({
  key: "video",
  default: ''
});

export const clipsState = atom<Clip[]>({
  key: "clip",
  default: [[0,0]]
});

export const actionState = atom<string>({
  key: 'action',
  default: 'seek'
});

export const durationState = atom<number>({
  key: 'duration',
  default: 0
});

export const seekMapState = selector<Map<number, number>>({
  key: 'seekMap',
  get: ({ get }) => {
    const clips = get(clipsState);
    const map = new Map([[0, clips[0][0]]]);
    
    for (let i = 1; i < clips.length; i++) {
      if (clips[i][0] - 1 > clips[i - 1][1]) {
        map.set(clips[i - 1][1], clips[i][0])
      }   
    }
    console.log('map -> ', map);
    return map 
  }
})

export const currentClipState = atom<number>({
  key: 'currentClip',
  default: 0
})

export const skippedSecondsState = selector<number>({
  key: 'skippedSeconds',
  get: ({ get }) => {
    const clips = get(clipsState);
    const currentClip = get(currentClipState);
    let skippedSeconds = 0;
    
    for (let i = 0;  i < currentClip; i++) {
      skippedSeconds += clips[i + 1][0] - clips[i][1] - 1; 
    }
    console.table({
      clips, currentClip, skippedSeconds
    })
    return skippedSeconds;
  }
})