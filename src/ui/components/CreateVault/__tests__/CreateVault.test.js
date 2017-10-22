import React from 'react';
import renderer from 'react-test-renderer';
import CreateVault from '../';

jest.mock('electron', () => {
  return {
    remote: {
      require: () => {
        return {
          dialog: {

          }
        };
      }
    }
  };
});

describe('CreateVault', () => {
  it('renders correctly', () => {
    const createVault = renderer.create(
      <CreateVault loadingHandler={() => { }} />
    ).toJSON();
    expect(createVault).toMatchSnapshot();
  });
});
