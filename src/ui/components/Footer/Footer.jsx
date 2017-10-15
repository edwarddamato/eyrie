import React from 'react';
import './Footer.scss';
const app = require('../../../../.app.json');

const Footer = () => (
  <footer className="footer">
    <div className="footer_author">Built with ❤️ by {app.author.replace('<info@edwarddamato.com>', '')}</div>
    <div className="footer_version">v{app.version}</div>
  </footer>
);

export default Footer;
