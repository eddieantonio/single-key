/*global describe,it,expect,jasmine,pending*/

import assert from 'assert';
import {
  isKeyTaggedValue, match, unpack, unpackObject,
  MatchError, NonConformingError
} from '../src';

const shouldSkipSymbolTests = (
  typeof Symbol !== 'undefined' ||
  Object.keys({[Symbol.iterator]: 1 }) !== 0
);

describe('The README', () => {
  it('has a working example for isKeyTaggedValue() ', () => {
    let obj = { foo: 'bar' };
    assert(isKeyTaggedValue(obj));

    obj = { foo: 'bar', 'herp': 'derp'};
    assert(isKeyTaggedValue(obj) === false);

    if (shouldSkipSymbolTests) {
      return;
    }

    obj = { [Symbol.iterator]: function*() { yield 'foo'; } };
    assert(isKeyTaggedValue(obj) === false);
  });

  it('has a working example for match() ', () => {
    /* Standard match. */
    let obj = { sypha: 'belnades' };
    let value = match(obj, {
      trevor: () => 'vampire killer',
      sypha: () => 'magic',
      grant: () => 'daggers'
    });

    assert(value === 'magic');

    /* No match found for the object. */
    try {
      match(obj, {
        alucard: (val, key) => 'turning into a flippin bat'
      });
    } catch (err) {
      assert(err instanceof MatchError);
    }


    /* Default provided to avoid match error.. */
    value = match(obj,
      {
        alucard: (val, key) => 'turning into a flippin bat'
      },
      (val, key) => {
        return "No one knows.";
      }
    );

    assert(value === "No one knows.");
  });

  it('has a working example for unpack() ', () => {
    let [key, value] = unpack({ content: 42 });

    assert(key === 'content');
    assert(value === 42);
  });

  it('has a working example for unpackObject() ', () => {
    let {key, value} = unpackObject({ content: 42 });

    assert(key === 'content');
    assert(value === 42);
  });
});
