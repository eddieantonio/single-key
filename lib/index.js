/**
 * @file
 * Utilities for "key-tagged values": An object with a single-key, hinting at
 * its value. May be useful for tagged unions.
 */

/**
 * Thrown when expecting a key-tagged value but got something else.
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

exports.getKey = getKey;
exports.unpack = unpack;
exports.unpackObject = unpackObject;
exports.onKey = onKey;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NonConformingError = (function (_TypeError) {
  _inherits(NonConformingError, _TypeError);

  function NonConformingError() {
    _classCallCheck(this, NonConformingError);

    _get(Object.getPrototypeOf(NonConformingError.prototype), "constructor", this).apply(this, arguments);
  }

  /**
   * Thrown when a onKey() found no matching key.
   */
  return NonConformingError;
})(TypeError);

exports.NonConformingError = NonConformingError;

var MatchError = (function (_TypeError2) {
  _inherits(MatchError, _TypeError2);

  function MatchError() {
    _classCallCheck(this, MatchError);

    _get(Object.getPrototypeOf(MatchError.prototype), "constructor", this).apply(this, arguments);
  }

  /**
   * @param {object} obj key-tagged value.
   * @return {(string|symbol)} the key of object.
   * @throws NonConformingError when obj is not a key-tagged value.
   */
  return MatchError;
})(TypeError);

exports.MatchError = MatchError;

function getKey(obj) {
  var keys = Object.keys(obj);
  if (keys.length !== 1) {
    throw new NonConformingError("Expected exactly one key but found " + keys.length);
  }
  return keys[0];
}

/**
 * Returns an array of the key and value from the key-tagged value.
 *
 * @param {object} obj key-tagged value.
 * @return {Array<?>} An array of two elements: key and its value.
 * @throws NonConformingError when obj is not a key-tagged value.
 */

function unpack(obj) {
  var key = getKey(obj);
  return [key, obj[key]];
}

/**
 * Like unpack(), but returns an object with key and value.
 *
 * @param {object} obj key-tagged value.
 * @return {{key, value}} An object with two elements.
 * @throws NonConformingError when obj is not a key-tagged value.
 */

function unpackObject(obj) {
  var key = getKey(obj);
  return { key: key, value: obj[key] };
}

/**
 * Runs an action depending on the SINGLE key in the object.  Throws if the
 * object has more than one key, or if there is no action given for the key.
 *
 * It's similar to switch statement on the key name. Unlike a switch
 * statement, it has a return value, and it may only run one case per call.
 *
 * @param {object} obj  key-tagged value.
 * @param {object} map  a map of possible keys to the callback that should be
 *                      invoked when the key is matched.
 * @return {?} The return of the matched callback.
 * @throws Error When there is no match
 * @throws NonConformingError when obj is not a key-tagged value.
 */

function onKey(obj, map) {
  var key = getKey(obj);
  var action = map[key];

  if (!(action instanceof Function)) {
    throw new MatchError("No action provided for key: " + key);
  }

  /* Invoke the action. */
  return action(obj[key], obj);
}