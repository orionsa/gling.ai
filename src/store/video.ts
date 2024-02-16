import { atom } from 'recoil';


export const videoState = atom<string>({
  key: "video",
  default: ''
});