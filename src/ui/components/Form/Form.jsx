import React from 'react';
import { pathOr, ifElse, isNil } from 'ramda';
import PropTypes from 'prop-types';

// const getComponentType = propOr(() => {}, 'type');

const getComponentId = pathOr(void 0, ['props', 'id']);

class Form extends React.Component {
  constructor (props) {
    super(props);

    this.state = {};
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
const TextBox = ({ id }) => (<input id={id} type="text" />);
TextBox.propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired
};
const CheckBox = props => (<input type="checkbox" />);
const RadioButton = props => (<input type="radio" />);
const SubmitButton = props => (<button type="submit">Submit</button>);

export { Form, Label, TextBox, CheckBox, RadioButton, SubmitButton };
