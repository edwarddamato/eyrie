import React from 'react';
import PropTypes from 'prop-types';
import { isNil } from 'ramda';
import { vault } from '../../../engine/vault/';
import './CreateVault.scss';
const remote = require('electron').remote;
const dialog = remote.require('electron').dialog;

class CreateVault extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      vaultCreated: ''
    };

    this.handleCreateVault = this.handleCreateVault.bind(this);
  }

  handleCreateVault () {
    const loadingHandler = this.props.loadingHandler;
    loadingHandler(true);

    dialog.showOpenDialog({
      properties: ['openDirectory', 'createDirectory'],
      message: 'Choose where you want to save your vault'
    }, filepaths => {
      if (isNil(filepaths)) { loadingHandler(false); return; }
      vault.create('my_vault', filepaths[0], 'secret123').then(() => {
        this.setState({
          vaultCreated: filepaths[0]
        }, () => {
          loadingHandler(false);
        });
      });
    });
  }

  render () {
    return (
      <section>
        <h2>Create Vault</h2>
        <button onClick={this.handleCreateVault}>Choose Folder</button>
      </section>
    );
  }
}
CreateVault.propTypes = {
  loadingHandler: PropTypes.func.isRequired
};

export default CreateVault;
