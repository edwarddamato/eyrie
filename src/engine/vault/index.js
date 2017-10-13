import path from 'path';
import { fileSystem as fs } from '../file-system';
import rimraf from 'rimraf';
import { merge, isNil, compose } from 'ramda';
import { cryptographer } from '../cryptographer';

const VAULT_TEMPLATE = {
  id: '',
  reference: '',
  contents: []
};

const decryptAndParseVaultContents = (contents, password) => {
  const cryptoInstance = cryptographer(password);
  const hashedPassword = cryptoInstance.hash(password);
  const decryptedContents = cryptoInstance.decrypt(contents, hashedPassword);
  try {
    return JSON.parse(decryptedContents);
  } catch (err) {
    throw new Error('Cannot open vault. Have you used the correct password?', err);
  }
};

const vault = {
  create: (name, location, secret) => new Promise((resolve, reject) => {
    const cryptoInstance = cryptographer(secret);
    const hashedSecret = cryptoInstance.hash(secret);

    // some refactoring needed here as well
    const newVaultEncrypted = compose(
      cryptoInstance.encrypt(hashedSecret),
      JSON.stringify,
      merge(VAULT_TEMPLATE)
    )({ id: hashedSecret, reference: name });

    fs.writeFile(path.join(location, `${name}.eyrie`), newVaultEncrypted, err => {
      isNil(err) ? resolve() : reject(err);
    });
  }),
  delete: (name, location) => {
    rimraf.sync(path.join(location, `${name}.eyrie`));
  },
  open: (location, password) => new Promise((resolve, reject) => {
    fs.readFile(location, 'UTF8', (err, contents) => {
      if (!isNil(err)) {
        reject(err);
      }

      // todo: some refactoring here
      try {
        const vaultContents = decryptAndParseVaultContents(contents, password);
        resolve(vaultContents);
      } catch (err) {
        reject(err);
      }
    });
  })
};

export { vault };
