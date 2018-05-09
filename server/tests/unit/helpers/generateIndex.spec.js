import chai from 'chai';
import generateIndex from '../../../helpers/generateIndex';

const { assert } = chai;

describe('Generate index', () => {
  it('it should increment by 1', () => {
    const { nextIndex } = generateIndex({ lastIndex: 1 });
    assert.equal(nextIndex, 2);
  });
});