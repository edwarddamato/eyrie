import React from 'react';
import renderer from 'react-test-renderer';
import MainContainer from '../';

describe('MainContainer', () => {
  it('renders correctly', () => {
    const mainContainer = renderer.create(
      <MainContainer><div>foo</div></MainContainer>
    ).toJSON();
    expect(mainContainer).toMatchSnapshot();
  });
});
