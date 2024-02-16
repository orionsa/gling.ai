import { FC } from 'react';

import { Navigation } from '../../components/Navigation/Navigation';
import './App.scss';

const App: FC = () => {
  return (
    <div className="app">
      <Navigation />
    </div>
  );
}

export default App;
