import path from 'path';
import fs from 'fs';
import rimraf from 'rimraf';
import R from 'ramda';
import { vault } from '../';

const DUMMY_VAULT_LOCATION = path.join(__dirname, '../dummy-vault-location');

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
    vault.create('vault_created', DUMMY_VAULT_LOCATION, 'a secret key')
      .then(() => {
        fs.access(`${DUMMY_VAULT_LOCATION}/vault_created.eyrie`, fs.constants.F_OK, err => {
          expect(err).toBeNull();
          done();
        });
      });
  });

  it('should throw when creating a vault in a non-existant location', done => {
    vault.create('vault_noway', path.join(DUMMY_VAULT_LOCATION, 'foobar'), 'a secret key')
      .catch(err => {
        expect(err.message).toBe(`ENOENT: no such file or directory, open '${path.join(DUMMY_VAULT_LOCATION, 'foobar', 'vault_noway.eyrie')}'`);
        done();
      });
  });

  // not sure if needed
  it.skip('should be created with initial encrypted contents', done => {
    vault.create('vault_created', DUMMY_VAULT_LOCATION, 'le secr')
      .then(() => {
        fs.readFile(`${DUMMY_VAULT_LOCATION}/vault_created.eyrie`, 'UTF8', (err, contents) => {
          if (err) throw new Error(err);
          expect(contents).toBe('2fff1bd81bfa69611b4a6fd69eb909373e935a209cba6678b650a6f5f7223e7fbcafe908e5dc802f2176f7cfa523bcf259cbd64cc6894fce445adbedab09b2f8fc6ee0f560561dcfd951d3dd17f9855f909d31a7fc6f6b43a709c41a69587dbef51cc67f1c1c');
          done();
        });
      });
  });

  it('should open a vault with the correct password and read contents', done => {
    vault.create('moo_vault', DUMMY_VAULT_LOCATION, 'mooo secret')
      .then(() => {
        vault.open(path.join(DUMMY_VAULT_LOCATION, 'moo_vault.eyrie'), 'mooo secret')
          .then(contents => {
            expect(contents).toEqual({
              contents: [],
              id: '2f306b732ee0723acf311dee1690eb59d0322fa3710b98ed5b399c3d2c4aa529',
              reference: 'moo_vault'
            });
            done();
          });
      });
  });

  it('should throw when trying to open a vault that does not exist', done => {
    vault.open(path.join(DUMMY_VAULT_LOCATION, 'some_unexisting.eyrie'), 'mooo wrong!').catch(err => {
      expect(err.message).toBe(`ENOENT: no such file or directory, open '${path.join(DUMMY_VAULT_LOCATION, 'some_unexisting.eyrie')}'`);
      done();
    });
  });

  it('should throw when opening a vault with an incorrect password', done => {
    vault.create('another_vault', DUMMY_VAULT_LOCATION, 'mooo secret')
      .then(() => {
        vault.open(path.join(DUMMY_VAULT_LOCATION, 'moo_vault.eyrie'), 'mooo wrong!').catch(err => {
          expect(err.message).toBe('Cannot open vault. Have you used the correct password?');
          done();
        });
      });
  });

  it('should be deleted given a name at a location', done => {
    vault.create('vault_deleted', DUMMY_VAULT_LOCATION, 'a secret').then(() => {
      vault.delete('vault_deleted', DUMMY_VAULT_LOCATION);
      fs.access(`${DUMMY_VAULT_LOCATION}/vault_deleted.eyrie`, fs.constants.F_OK, err => {
        expect(R.isNil(err)).toBe(false);
        done();
      });
    });
  });
});
