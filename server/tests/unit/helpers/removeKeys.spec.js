import chai from 'chai';
import removeKeys from '../../../helpers/removekeys';

const { assert } = chai;

describe('Remove Keys', () => {
  const obj = {
    id: 0,
    name: 'myname',
    bvn: 21282811,
    password: 'i should be hidden'
  };

  it('it should return same object for unspecified keys', () => {
    const object = removeKeys(obj);
    assert.deepEqual(Object.keys(object), ['id', 'name', 'bvn', 'password']);
  });

  it('it should return same object for absent keys', () => {
    const object = removeKeys(obj, ['absentkey']);
    assert.deepEqual(Object.keys(object), ['id', 'name', 'bvn', 'password']);
  });

  it('it should remove key-value pair from an object', () => {
    const withoutKey = removeKeys(obj, ['password', 'bvn']);
    assert.equal(typeof(withoutKey), 'object');
    assert.deepEqual(Object.keys(withoutKey), ['id', 'name']);
  });
});