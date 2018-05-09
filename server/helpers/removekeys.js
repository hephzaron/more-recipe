/**
 * Remove selected keys from object
 * @param { object } object -Object to remove keys from
 * @param { array } keys -Array of keys to be removed
 * @returns { object } object
 */
export default function removeKeys(object, keys) {
  if (!keys) {
    if (!object) {
      return null;
    }
    return object;
  }
  if (Array.isArray(keys) && (typeof object === 'object')) {
    const obj = object;
    keys.map(key => delete obj[key]);
    return obj;
  }
  return object;
}