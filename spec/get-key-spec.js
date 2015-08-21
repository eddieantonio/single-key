/*global describe, it, expect*/
import {getKey, NonConformingError} from '../src';

describe('getKey', () => {
  it('gets key from a key-tagged value', () => {
    const obj = {
      'I am the key': 'value'
    };

    expect(getKey(obj)).toBe('I am the key');
  });

  it('gets key when the prototype is null', () => {
    const obj = Object.create(null);
    obj.theKey = 'value';

    expect(getKey(obj)).toBe('theKey');
  });


  it('gets key when the prototype is polluted', () => {
    const obj = Object.create({ theKey: 'Hello' });
    obj.theKey = 'the value';

    expect(getKey(obj)).toBe('theKey');
  });

  describe('NonConformingError', () => {
    it('fails when passed an empty object', () => {
      expect(() => {
        getKey({});
      }).toThrowError(NonConformingError);
    });

    it('fails when passed an object with too many properties', () => {
      expect(() => {
        getKey({oneKey: 'value', twoKey: 'value'});
      }).toThrowError(NonConformingError);
    });

    it('fails when empty and the prototype is polluted', () => {
      const obj = Object.create({
        theKey: 'value'
      });

      expect(() => {
        getKey(obj);
      }).toThrowError(NonConformingError);
    });

    it('fails when passed an object with no enumerable properties', () => {
      let obj = Object.create(null, {
        theKey: {
          value: 'value',
          enumerable: false
        }
      });

      expect(() => {
        getKey(obj);
      }).toThrowError(NonConformingError);

      obj = { theKey: 'value' };
      expect(getKey(obj)).toBe('theKey');
      Object.defineProperty(obj, 'theKey', {
        enumerable: false
      });

      expect(() => {
        getKey(obj);
      }).toThrowError(NonConformingError);
    });
  });
});
