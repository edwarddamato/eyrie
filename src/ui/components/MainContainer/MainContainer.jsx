import React from 'react';
import PropTypes from 'prop-types';
import './MainContainer.scss';

const MainContainer = props => <div className="main">{props.children}</div>;
MainContainer.propTypes = {
  children: PropTypes.node.isRequired
};

export default MainContainer;
