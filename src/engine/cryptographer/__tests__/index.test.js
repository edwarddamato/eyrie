import { cryptographer } from '../';

describe('cryptographer', () => {
  it('should create a hash given a string', () => {
    const cryptoInstance = cryptographer('my secret');
    const hashedVal = cryptoInstance.hash('my secret');
    expect(hashedVal).toBe('6beb6b4f76ad4e35940d961ae87a8e035957c63c913165c2e5a369c24f75de41');
  });

  it('should encrypt and decrypt text with some password', () => {
    const cryptoInstance = cryptographer('my secret');
    const encValue = cryptoInstance.encrypt('mypassword')('this is a lot of text!!!');
    const decValue = cryptoInstance.decrypt(encValue, 'mypassword');
    expect(decValue).toBe('this is a lot of text!!!');
  });
});
