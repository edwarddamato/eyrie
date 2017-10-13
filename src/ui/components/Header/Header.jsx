import React from 'react';
import './Header.scss';
const app = require('../../../../.app.json');

const Header = () => (
  <header className="header">
    <h1 className="header_title">eyrie {app.version}</h1>
    <div className="header_author">Built with ❤️ by {app.author}</div>
  </header>
);

export default Header;
