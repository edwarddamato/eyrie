import React from 'react';
import PropTypes from 'prop-types';

class Form extends React.Component {
  constructor (props) {
    super(props);

    this.state = {};
  }

  componentDidMount () {
  }

  render () {
    return (
      <form onSubmit={this.props.onSubmit} className="form">
        {this.props.children}
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
const TextBox = props => (<input type="text" />);
TextBox.propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired
};
const CheckBox = props => (<input type="checkbox" />);
const RadioButton = props => (<input type="radio" />);
const SubmitButton = props => (<button type="submit">Submit</button>);

export { Form, Label, TextBox, CheckBox, RadioButton, SubmitButton };
