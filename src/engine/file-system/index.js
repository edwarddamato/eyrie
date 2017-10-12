import fs from 'fs';

const fileSystem = {
  writeFile: (path, data, callback) => {
    console.info('Writing', path);
    fs.writeFile(path, data, err => {
      callback(err);
    });
  },
  readFile: (path, options, callback) => {
    console.info('Reading', path);
    fs.readFile(path, options, (err, contents) => {
      callback(err, contents);
    });
  }
};

export { fileSystem };
