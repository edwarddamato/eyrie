import React from 'react';
import { pathOr, ifElse, isNil } from 'ramda';
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
          [getComponentId(child)]: ''
        });
      }
    )(childId);
  }

  formSubmit () {
    this.props.onSubmit(this.state);
  }

  onTextBoxChange (event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  render () {
    return (
      <form onSubmit={this.formSubmit} className="form">
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

const withForm = (WrappedComponent, form) => {
  return class extends React.PureComponent {
    static get propTypes () {
      return {
        form: PropTypes.object.isRequired
      };
    }

    get displayName () {
      return `Form${getDisplayName(WrappedComponent)}`;
    }

    componentDidMount () {
      this.props.form.childComponentDidMount(<WrappedComponent {...this.props} />);
    }

    render () {
      return <WrappedComponent {...this.props} />;
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
const BaseTextBox = ({ id, onChange, placeholder, masked, readonly, value }) => (
  <input
    className="form_textbox"
    id={id}
    onChange={onChange}
    placeholder={placeholder}
    type={ masked ? 'password' : 'text' }
    readOnly={readonly}
    value={value} />
);
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
const SubmitButton = props => (<button type="submit">Submit</button>);

export { Form, Field, Label, TextBox, CheckBox, RadioButton, SubmitButton };
