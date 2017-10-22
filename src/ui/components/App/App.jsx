import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Loader from '../Loader';
import MainContainer from '../MainContainer';
import WelcomeScreen from '../WelcomeScreen';
import './App.scss';

class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      loading: false
    };

    this.handleToggleLoadingState = this.handleToggleLoadingState.bind(this);
  }

  handleToggleLoadingState (isLoading) {
    this.setState({
      loading: isLoading
    });
  }

  render () {
    return (
      <div className="root_container">
        {
          this.state.loading
            ? <Loader />
            : null
        }
        <Header />
        <MainContainer>
          <WelcomeScreen loadingHandler={this.handleToggleLoadingState} />
        </MainContainer>
        <Footer />
      </div>
    );
  }
}

export default App;
