import React from 'react';
import { vault } from '../../../engine/vault/';
import './LocationSelector.scss';
const remote = require('electron').remote;
const dialog = remote.require('electron').dialog;

class LocationSelector extends React.Component {
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
      vault.create('my_vault', filepaths[0], 'secret123');
      this.setState({
        vaultCreated: filepaths[0]
      });
    });
  }

  render () {
    return (
      <div>
        <button onClick={this.handleCreateVault}>Create a vault!</button>
        {this.state.vaultCreated}
      </div>
    );
  }
}

export default LocationSelector;
