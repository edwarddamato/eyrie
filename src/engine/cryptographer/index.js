import { createHmac, createCipher, createDecipher } from 'crypto';

// console.log(os.hostname());

const ALGORITHM = 'aes-256-ctr';

const cryptographer = secret => {
  const hash = createHmac('sha256', secret);

  return {
    hash: value => hash
      .update(value)
      .digest('hex'),
    encrypt: password => text => {
      const cipher = createCipher(ALGORITHM, password);
      const crypted = `${cipher.update(text, 'utf8', 'hex')}`;
      return crypted;
    },
    decrypt: (encryptedValue, password) => {
      const decipher = createDecipher(ALGORITHM, password);
      const decrypted = `${decipher.update(encryptedValue, 'hex', 'utf8')}`;
      return decrypted;
    }
  };
};

export { cryptographer };
