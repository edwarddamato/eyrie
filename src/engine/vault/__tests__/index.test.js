import path from 'path';
import fs from 'fs';
import rimraf from 'rimraf';
import R from 'ramda';
import { vault } from '../';

const DUMMY_VAULT_LOCATION = path.join(__dirname, '../dummy-vault-location');
const DUMMY_VAULT_NAME = 'my_vault.eyrie';

describe('vault', () => {
  beforeAll(() => {
    if (fs.existsSync(DUMMY_VAULT_LOCATION)) {
      rimraf.sync(DUMMY_VAULT_LOCATION);
    }
    fs.mkdirSync(DUMMY_VAULT_LOCATION);
  });

  afterAll(() => {
    rimraf.sync(DUMMY_VAULT_LOCATION);
  });

  it('should be created with a name at a location', done => {
    vault.create('vault_created', DUMMY_VAULT_LOCATION)
    .then(() => {
      fs.access(`${DUMMY_VAULT_LOCATION}/vault_created.eyrie`, fs.constants.F_OK, err => {
        expect(err).toBeNull();
        done();
      });
    });
  });

  it('should be deleted given a name at a location', done => {
    vault.create('vault_deleted', DUMMY_VAULT_LOCATION).then(() => {
      vault.delete('vault_deleted', DUMMY_VAULT_LOCATION);
      fs.access(`${DUMMY_VAULT_LOCATION}/vault_deleted.eyrie`, fs.constants.F_OK, err => {
        expect(R.isNil(err)).toBe(false);
        done();
      });
    });
  });
});