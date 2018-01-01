import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import { Form, Label, TextBox, CheckBox, RadioButton, SubmitButton } from '../';

describe('Form', () => {
  it('renders correctly', () => {
    const form = renderer.create(
      <Form onSubmit={() => {}}>
        <Label htmlFor="txtFoo">Moo</Label>
        <TextBox id="txtFoo" placeholder="moo" />
        <CheckBox />
        <RadioButton />
        <SubmitButton />
      </Form>
    ).toJSON();
    expect(form).toMatchSnapshot();
  });

  it('mounts with form state based on children', () => {
    const wrapper = mount(
      <Form onSubmit={() => {}}>
        <TextBox id="txtFoo" placeholder="foo" />
        <TextBox id="txtMoo" placeholder="moo" />
        <SubmitButton />
      </Form>
    );
    expect(wrapper.state()).toEqual({
      txtFoo: '',
      txtMoo: ''
    });
  });

  it('calls the submit function when submitted', () => {
    const formOnSubmit = jest.fn();

    const wrapper = shallow(
      <Form onSubmit={formOnSubmit}>
        <TextBox id="txtFoo" placeholder="moo" />
        <SubmitButton />
      </Form>
    );
    wrapper.find('form').simulate('submit');

    expect(formOnSubmit).toBeCalledWith();
  });
});
