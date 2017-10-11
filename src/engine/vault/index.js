import path from 'path';
import fs from 'fs';
import rimraf from 'rimraf';
import R from 'ramda';

const vault = {
  create: (name, location) => new Promise((resolve, reject) => {
    fs.writeFile(path.join(location, `${name}.eyrie`), { foo: 'bar' }, err => {
      R.isNil(err) ? resolve() : reject(err);
    });
  }),
  delete: (name, location) => {
    rimraf.sync(path.join(location, `${name}.eyrie`));
  }
};

export { vault };
