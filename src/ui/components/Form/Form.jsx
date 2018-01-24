import React from 'react';
import { identity, pathOr, ifElse, isNil, dissoc, merge, equals } from 'ramda';
import PropTypes from 'prop-types';

// const getComponentType = propOr(() => {}, 'type');

const getComponentId = pathOr(void 0, ['props', 'id']);

class Form extends React.Component {
  constructor (props) {
    super(props);

    this.state = {};

    this.formSubmit = this.formSubmit.bind(this);
    this.onTextBoxChange = this.onTextBoxChange.bind(this);
    this.childComponentDidMount = this.childComponentDidMount.bind(this);
  }

  childComponentDidMount (child) {
    const childId = getComponentId(child);
    ifElse(
      isNil,
      () => {},
      childId => {
        this.setState({
          [childId]: ''
        });
      }
    )(childId);
  }

  formSubmit (e) {
    e.preventDefault();
    this.props.onSubmit(this.state);
  }

  onTextBoxChange (id, value) {
    this.setState({
      [id]: value
    });
  }

  render () {
    return (
      // <form onChange={e => { console.log('==----------', e.target); }} onSubmit={this.formSubmit} className="form">
      <form onChange={e => { console.log('==----------', e.target); }} onSubmit={this.formSubmit} className="form">
        { this.props.children({
          onTextBoxChange: this.onTextBoxChange,
          form: this
        }) }
      </form>
    );
  }
}
Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired
};

const getDisplayName = WrappedComponent => WrappedComponent.displayName || WrappedComponent.name || 'Component';

const withForm = (WrappedComponent, form, propTypes) => {
  return class extends React.PureComponent {
    static get propTypes () {
      return merge(WrappedComponent.propTypes, {
        form: PropTypes.object.isRequired
      });
    }

    get displayName () {
      return `Form${getDisplayName(WrappedComponent)}`;
    }

    filterProps (props) {
      return dissoc('form', props);
    }

    // TODO: need to think of a better way of how to do this - replicating WrappedComponent doesn't seem sensible
    componentDidMount () {
      const formChildComponentDidMount = pathOr(identity, ['props', 'form', 'childComponentDidMount'], this);
      formChildComponentDidMount(<WrappedComponent {...this.props} />);
    }

    render () {
      return <WrappedComponent {...this.filterProps(this.props)} />;
    }
  };
};

const Field = ({ children }) => (<div className="form_field">{ children }</div>);
Field.propTypes = {
  children: PropTypes.node.isRequired
};
const Label = ({ htmlFor, children }) => (
  <label
    className="form_label"
    htmlFor={htmlFor}>
    {children}
  </label>
);
Label.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};
class BaseTextBox extends React.PureComponent {
  constructor (props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }
  onChange (event) {
    this.props.onChange(event.target.id, event.target.value);
  }

  componentWillReceiveProps (nextProps) {
    const oldValue = this.props.value;
    const newValue = nextProps.value;
    const sameValue = equals(oldValue, newValue);
    if (!sameValue) {
      // console.log('foo', this.props.id, newValue);
      this.props.onChange(this.props.id, newValue);
    }
  }

  render () {
    const { id, placeholder, masked, readonly, value, ...restProps } = this.props;
    // console.log(this.onChange);
    return (
      <input
        className="form_textbox"
        id={id}
        placeholder={placeholder}
        type={ masked ? 'password' : 'text' }
        readOnly={readonly}
        value={value}
        {...restProps}
        onChange={this.onChange} />
    );
  }
};
BaseTextBox.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  masked: PropTypes.bool,
  readonly: PropTypes.bool,
  value: PropTypes.string
};
const TextBox = withForm(BaseTextBox, form => form);
const CheckBox = props => (<input type="checkbox" />);
const RadioButton = props => (<input type="radio" />);
const SubmitButton = ({ text }) => (<button type="submit">{text}</button>);
SubmitButton.propTypes = {
  text: PropTypes.string.isRequired
};

export { Form, Field, Label, TextBox, CheckBox, RadioButton, SubmitButton };
