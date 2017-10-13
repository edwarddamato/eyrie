import React from 'react';
import Header from '../Header';
import LocationSelector from '../LocationSelector';
import './App.scss';

const App = () => (
  <div className="root_container">
    <Header />
    We're using Node.js {process.versions.node},
    Chromium {process.versions.chrome},
    and Electron {process.versions.electron}.

    <LocationSelector />
  </div>
);

export default App;
