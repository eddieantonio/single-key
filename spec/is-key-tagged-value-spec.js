/*global describe, it, expect*/
import {isKeyTaggedValue} from '../src';

describe('isKeyTaggedValue', () => {
  it('returns true for single key objects', () => {
    expect(isKeyTaggedValue({key: 'value'})).toBe(true);

    class Foo {
      constructor() {
        this.singleProperty = 42;
      }
    }
    expect(isKeyTaggedValue(new Foo())).toBe(true);
  });

  if (typeof Symbol !== 'undefined') {
    it('returns false for an object with single keys', () => {
      expect(isKeyTaggedValue({[Symbol.iterator]: 'value'})).toBe(false);
    });
  }

  it('returns true for sparse arrays', () => {
    const array = [];
    array[2] = 'value';
    expect(isKeyTaggedValue(array)).toBe(true);
  });

  it('returns false for empty objects', () => {
    expect(isKeyTaggedValue({})).toBe(false);
    expect(isKeyTaggedValue([])).toBe(false);
  });

  it('returns false for non-objects', () => {
    expect(isKeyTaggedValue(undefined)).toBe(false);
    expect(isKeyTaggedValue(null)).toBe(false);
    expect(isKeyTaggedValue(true)).toBe(false);
    expect(isKeyTaggedValue(false)).toBe(false);
    expect(isKeyTaggedValue('')).toBe(false);
    expect(isKeyTaggedValue('foo')).toBe(false);
    if (typeof Symbol !== 'undefined') {
      expect(isKeyTaggedValue(Symbol.iterator)).toBe(false);
    }
    expect(isKeyTaggedValue(NaN)).toBe(false);
    expect(isKeyTaggedValue(-5e32)).toBe(false);
  });
});
