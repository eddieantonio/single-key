/**
 * @file
 *
 * Utilities for "key-tagged values": An object with a single-key, hinting at
 * its value. Useful for tagged unions.
 */

/**
 * Thrown when expecting a key-tagged value but got something else.
 */
export class NonConformingError extends TypeError {
}

/**
 * Thrown when a match() found no matching key.
 */
export class MatchError extends Error {
}

/**
 * @param {object} obj key-tagged value.
 * @return {string} the key of object.
 * @throws NonConformingError when obj is not a key-tagged value.
 */
export function getKey(obj) {
  const keys = Object.keys(obj);
  if (keys.length !== 1) {
    throw new NonConformingError(
      `Expected exactly one key but found ${keys.length}`
    );
  }
  return keys[0];
}

/**
 * Given any value, returns whether this value is a conforming key-tagged
 * value. That is, an object with exactly one enumerable property.
 *
 * @param {*} val any value
 * @return {boolean} true if the object is a suitable key-tagged value.
 */
export function isKeyTaggedValue(val) {
  return (
    typeof val === 'object' &&
    val !== null &&
    Object.keys(val).length === 1
  );
}

/**
 * Returns an array of the key and value from the key-tagged value.
 *
 * @param {object} obj key-tagged value.
 * @return {Array<?>} An array of two elements: key and its value.
 * @throws NonConformingError when obj is not a key-tagged value.
 */
export function unpack(obj) {
  const key = getKey(obj);
  return [key, obj[key]];
}

/**
 * Like unpack(), but returns an object with key and value.
 *
 * @param {object} obj key-tagged value.
 * @return {{key: string, value}} An object with properties `key` and `value`.
 * @throws NonConformingError when obj is not a key-tagged value.
 */
export function unpackObject(obj) {
  const key = getKey(obj);
  return {key, value: obj[key]};
}

/**
 * Runs an action depending on the single key in the object. Throws if the
 * object has more than one key, or if there is no action given for the key.
 *
 * It's similar to switch statement on the key name. Unlike a switch
 * statement, it has a return value, and it may only run one case per call.
 *
 * The callback matched is called with the value, and the key, respectively.
 *
 * @param {object} obj key-tagged value.
 * @param {object} map a map of possible keys to the callback that should be
 *                     invoked when the key is matched.
 * @param {function} otherwise called on match failure; it should have the
 * same signature as a function given in `map`.
 * @return {?} The return of the matched callback.
 * @throws MatchError When there is no match, and no third parameter is
 * provided.
 * @throws NonConformingError when obj is not a key-tagged value.
 */
export function match(obj, map, otherwise) {
  const [key, val] = unpack(obj);
  const action = map[key];

  if (!(action instanceof Function)) {
    if (otherwise instanceof Function) {
      return otherwise(val, key);
    }
    throw new MatchError(`No action provided for key: ${key}`);
  }

  /* Invoke the action. */
  return action(val, key);
}
