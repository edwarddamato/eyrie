import React from 'react';
import PropTypes from 'prop-types';
import { isNil } from 'ramda';
import { vault } from '../../../engine/vault/';
import { Form, Field, TextBox, Label, SubmitButton } from '../Form';
import './CreateVault.scss';
const remote = require('electron').remote;
const dialog = remote.require('electron').dialog;

class CreateVault extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      vaultCreated: ''
    };

    this.handleVaultFolderChoice = this.handleVaultFolderChoice.bind(this);
    this.handleCreateVault = this.handleCreateVault.bind(this);
  }

  handleVaultFolderChoice () {
    const loadingHandler = this.props.loadingHandler;
    loadingHandler(true);

    dialog.showOpenDialog({
      properties: ['openDirectory', 'createDirectory'],
      message: 'Choose where you want to create your vault'
    }, filepaths => {
      if (isNil(filepaths)) { loadingHandler(false); return; }
      this.setState({
        vaultCreated: filepaths[0]
      }, () => {
        loadingHandler(false);
      });
    });
  }

  handleCreateVault () {
    const loadingHandler = this.props.loadingHandler;
    const vaultLocation = this.state.vaultCreated;
    loadingHandler(true);

    if (isNil(vaultLocation)) { loadingHandler(false); return; }
    vault.create('my_vault', vaultLocation, 'secret123').then(() => {
      loadingHandler(false);
    });
  }

  render () {
    return (
      <section>
        <h2>Create Vault</h2>
        <Form onSubmit={values => { console.log(values); return false; }}>
          {({ onTextBoxChange, form }) => (
            <React.Fragment>
              <Field>
                <Label htmlFor="txtVaultName">Vault Name</Label>
                <TextBox id="txtVaultName" placeholder="Vault Name" onChange={onTextBoxChange} form={form} maxLength={25} />
              </Field>
              <Field>
                <Label htmlFor="txtVaultSecret">Vault Secret</Label>
                <TextBox id="txtVaultSecret" masked placeholder="Must be at least 8 characters long" onChange={onTextBoxChange} form={form} />
              </Field>
              <Field>
                <Label htmlFor="txtConfirmVaultSecret">Confirm Vault Secret</Label>
                <TextBox id="txtConfirmVaultSecret" masked placeholder="" onChange={onTextBoxChange} form={form} />
              </Field>
              <Field>
                <Label htmlFor="txtVaultLocation">Vault Location</Label>
                <TextBox
                  id="txtVaultLocation"
                  readonly
                  placeholder="Choose Folder..."
                  onClick={this.handleVaultFolderChoice}
                  value={this.state.vaultCreated}
                  onChange={onTextBoxChange}
                  form={form} />
              </Field>
              <SubmitButton text="Create" />
            </React.Fragment>
          )}
        </Form>
      </section>
    );
  }
}
CreateVault.propTypes = {
  loadingHandler: PropTypes.func.isRequired
};

export default CreateVault;
