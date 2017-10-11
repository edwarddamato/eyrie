import crypto from 'crypto';

const SECRET = 'EYRIE_IS_SECRET';

const hash = crypto.createHmac('sha256', SECRET);

const hashing = {
  hash: value => hash
    .update(value)
    .digest('hex')
};

export { hashing };