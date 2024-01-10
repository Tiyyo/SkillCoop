import deleteDecodedKey from '../delete-decoded.js';

describe('deleteDecodedKey', () => {
  test('should delete the decoded key from the object', () => {
    const mockObject = {
      decoded: 'decoded',
      other: 'other',
    };
    deleteDecodedKey(mockObject);
    expect(mockObject).toHaveProperty('other');
    expect(mockObject).not.toHaveProperty('decoded');
  });
});
