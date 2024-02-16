import { FC } from 'react';
import { useRecoilState } from 'recoil';

import { videoState } from '../../store/video';
import { Navigation } from '../../components/Navigation/Navigation';
import './App.scss';

const App: FC = () => {
  const [vid] = useRecoilState(videoState);
  return (
    <div className="app">
      {/* {vid} */}
      <Navigation />
    </div>
  );
}

export default App;
