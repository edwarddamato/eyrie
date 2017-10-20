import React from 'react';
import { isNil } from 'ramda';
import { vault } from '../../../engine/vault/';
import './WelcomeScreen.scss';
const remote = require('electron').remote;
const dialog = remote.require('electron').dialog;

class WelcomeScreen extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      vaultCreated: ''
    };

    this.handleCreateVault = this.handleCreateVault.bind(this);
  }

  handleCreateVault () {
    dialog.showOpenDialog({
      properties: ['openDirectory', 'createDirectory'],
      message: 'Choose where you want to save your vault'
    }, filepaths => {
      if (isNil(filepaths)) return;
      vault.create('my_vault', filepaths[0], 'secret123');
      this.setState({
        vaultCreated: filepaths[0]
      });
    });
  }

  render () {
    return (
      <section className="ws">
        <h2 className="ws_title">{'Let\'s start.'}</h2>
        <ul className="ws_choice-list">
          <li className="ws_choice-item"><button className="ws_choice-button" onClick={this.handleCreateVault}>Create new vault</button></li>
          <li className="ws_choice-item"><button className="ws_choice-button" onClick={this.handleCreateVault}>Open existing vault</button></li>
        </ul>
        {this.state.vaultCreated}
      </section>
    );
  }
}

export default WelcomeScreen;
