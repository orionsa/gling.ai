import { MouseEvent } from 'react';

export interface TimelineProps {
  currentTime: number,
  onSeek: (s:number) => void
}

export interface SingleClipProps { 
  index: number,
  onClick: (e: MouseEvent<HTMLDivElement> ,index: number) => void,
  widthPer: number 
}

export enum Colors {
  "#D9ED92",
  "#B5E48C",
  "#99D98C",
  "#76C893",
  "#52B69A",
  "#34A0A4",
  "#168AAD",
  "#1A759F",
  "#1E6091",
  "#184E77"
}
