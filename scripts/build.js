const fs = require('fs');
const path = require('path');
const appPackage = require('../package.json');

fs.writeFile(
  path.join(__dirname, '../', '.app.json'),
  JSON.stringify({
    version: appPackage.version,
    author: appPackage.author
  })
);
