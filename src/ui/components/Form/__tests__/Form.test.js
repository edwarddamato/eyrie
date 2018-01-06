import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { Form, Field, Label, TextBox, CheckBox, RadioButton, SubmitButton } from '../';

describe('Form', () => {
  it('renders correctly', () => {
    const form = renderer.create(
      <Form onSubmit={() => {}}>
        {({ onTextBoxChange, form }) => (
          <React.Fragment>
            <Field>
              <Label htmlFor="txtFoo">Moo</Label>
              <TextBox id="txtFoo" placeholder="moo" onChange={onTextBoxChange} form={form} />
            </Field>
            <CheckBox />
            <RadioButton />
            <SubmitButton />
          </React.Fragment>
        )}
      </Form>
    ).toJSON();
    expect(form).toMatchSnapshot();
  });

  it('mounts with form state based on children', () => {
    const wrapper = mount(
      <Form onSubmit={() => {}}>
        {({ onTextBoxChange, form }) => (
          <React.Fragment>
            <TextBox id="txtFoo" placeholder="foo" onChange={onTextBoxChange} form={form} />
            <TextBox id="txtMoo" placeholder="moo" onChange={onTextBoxChange} form={form} />
            <SubmitButton />
          </React.Fragment>
        )}
      </Form>
    );
    expect(wrapper.state()).toEqual({
      txtFoo: '',
      txtMoo: ''
    });
  });

  it('sets the form state when a form element value changes', () => {
    const wrapper = mount(
      <Form onSubmit={() => {}}>
        {({ onTextBoxChange, form }) => (
          <React.Fragment>
            <TextBox id="txtFoo" placeholder="moo" onChange={onTextBoxChange} form={form} />
            <SubmitButton />
          </React.Fragment>
        )}
      </Form>
    );
    wrapper.find('input[type="text"]').simulate('change', { target: { id: 'txtFoo', value: 'foobar' } });

    expect(wrapper.state()).toEqual({
      txtFoo: 'foobar'
    });
  });

  it('calls the submit function when submitted', () => {
    const formOnSubmit = jest.fn();

    const wrapper = mount(
      <Form onSubmit={formOnSubmit}>
        {({ onTextBoxChange, form }) => (
          <React.Fragment>
            <TextBox id="txtFoo" placeholder="moo" onChange={onTextBoxChange} form={form} />
            <TextBox id="txtMoo" placeholder="moo" onChange={onTextBoxChange} form={form} />
            <SubmitButton />
          </React.Fragment>
        )}
      </Form>
    );
    wrapper.find('form').simulate('submit');

    expect(formOnSubmit).toBeCalledWith({
      txtFoo: '',
      txtMoo: ''
    });
  });
});
