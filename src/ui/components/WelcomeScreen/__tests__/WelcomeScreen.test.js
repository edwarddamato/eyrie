import React from 'react';
import renderer from 'react-test-renderer';
import WelcomeScreen from '../';

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

describe('WelcomeScreen', () => {
  it('renders correctly', () => {
    const welcomeScreen = renderer.create(
      <WelcomeScreen loadingHandler={() => { }} />
    ).toJSON();
    expect(welcomeScreen).toMatchSnapshot();
  });
});
