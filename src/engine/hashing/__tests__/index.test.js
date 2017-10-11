import { hashing } from '../';

describe('hashing', () => {
  it('should create a fixed length hash given a string', () => {
    const hashedVal = hashing.hash('my_vault_name');
    expect(hashedVal).toBe('553416c48ec3c15fe0bdedd698f57f202edc64fc5c54679395c2497b6cf7ac21');
  })
});