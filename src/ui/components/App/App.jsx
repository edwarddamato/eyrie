import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import WelcomeScreen from '../WelcomeScreen';
import './App.scss';

class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      loading: false
    };
  }

  render () {
    return (
      <div className="root_container">
        <Header />
        {/* We're using Node.js {process.versions.node},
        Chromium {process.versions.chrome},
        and Electron {process.versions.electron}. */}

        <WelcomeScreen />
        <Footer />
      </div>
    );
  }
}

export default App;
