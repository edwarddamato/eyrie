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
  }

  componentDidMount () {
    // TODO: This is a bit ugly - need to think of a better way (especially when there are different form elements)
    const children = this.props.children;
    React.Children.forEach(children, child => {
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
    });
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
        {
          React.Children.map(this.props.children, child =>
            React.cloneElement(child, {
              onChange: this.onTextBoxChange
            })
          )
        }
      </form>
    );
  }
}
Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

const Label = ({ htmlFor, children }) => (<label htmlFor={htmlFor}>{children}</label>);
Label.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};
const TextBox = ({ id, onChange }) => (<input id={id} onChange={onChange} type="text" />);
TextBox.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string.isRequired
};
const CheckBox = props => (<input type="checkbox" />);
const RadioButton = props => (<input type="radio" />);
const SubmitButton = props => (<button type="submit">Submit</button>);

export { Form, Label, TextBox, CheckBox, RadioButton, SubmitButton };
