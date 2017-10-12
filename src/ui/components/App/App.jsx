import React from 'react';
import './App.scss';

const App = () => (
  <div className="root_container">
    We're using Node.js {process.versions.node},
    Chromium {process.versions.chrome},
    and Electron {process.versions.electron}.
  </div>
);

export default App;
