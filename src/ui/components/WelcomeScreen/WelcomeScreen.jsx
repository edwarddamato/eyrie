import React from 'react';
import PropTypes from 'prop-types';
import CreateVault from '../CreateVault';
import './WelcomeScreen.scss';

const ACTIVE_CHOICE = {
  NONE: 0,
  CREATE: 1,
  OPEN: 2
};

class WelcomeScreen extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      activeChoice: ACTIVE_CHOICE.NONE
    };

    this.handleCreateVault = this.handleCreateVault.bind(this);
    this.handleOpenVault = this.handleOpenVault.bind(this);
  }

  handleCreateVault () {
    this.setState({
      activeChoice: ACTIVE_CHOICE.CREATE
    });
  }

  handleOpenVault () {
    this.setState({
      activeChoice: ACTIVE_CHOICE.OPEN
    });
  }

  render () {
    switch (this.state.activeChoice) {
      default:
      case ACTIVE_CHOICE.NONE:
        return (
          <section className="ws">
            <h2 className="ws_title">{'Let\'s start.'}</h2>
            <ul className="ws_choice-list">
              <li className="ws_choice-item"><button className="ws_choice-button" onClick={this.handleCreateVault}>Create new vault</button></li>
              <li className="ws_choice-item"><button className="ws_choice-button" onClick={this.handleOpenVault}>Open existing vault</button></li>
            </ul>
          </section>
        );
      case ACTIVE_CHOICE.CREATE:
        return <CreateVault loadingHandler={this.props.loadingHandler} />;
      case ACTIVE_CHOICE.OPEN:
        return <div>OPEN</div>;
    }
  }
}
WelcomeScreen.propTypes = {
  loadingHandler: PropTypes.func.isRequired
};

export default WelcomeScreen;
