import { FC } from 'react';
import { useRecoilState } from 'recoil';

import { videoState } from '../store/video';
import './App.scss';

const App: FC = () => {
  const [vid] = useRecoilState(videoState);
  return (
    <div className="app">
      {vid}
    </div>
  );
}

export default App;
