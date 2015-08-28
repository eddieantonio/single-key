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
      /* 1: Set non-enumerable in Object.create */
      let obj = Object.create(null, {
        theKey: {
          value: 'value'
          /* Default is enumberable: false. */
        }
      });
      expect(() => {
        getKey(obj);
      }).toThrowError(NonConformingError);

      /* 2: With syntax for getters in object intializers. */
      /*
       * Getters in object literals are enumerable by default:
       * http://www.ecma-international.org/ecma-262/6.0/#sec-object-initializer-runtime-semantics-evaluation
       */
      obj = {
        get theKey() {
          return 'value';
        }
      };
      expect(getKey(obj)).toBe('theKey');

      /* 3: With syntax for getters in classes. */
      /*
       * In class defintions, however, getters are not enumerable:
       * http://www.ecma-international.org/ecma-262/6.0/#sec-runtime-semantics-classdefinitionevaluation
       */
      class FooClass {
        get theKey() {
          return 'value';
        }
      }
      expect(() => {
        getKey(FooClass.prototype);
      }).toThrowError(NonConformingError);

      /* Counter example: a simple object. */
      obj = { theKey: 'value' };
      expect(getKey(obj)).toBe('theKey');

      /* 4: Setting enumerable: false after the fact. */
      Object.defineProperty(obj, 'theKey', {
        enumerable: false
      });
      expect(obj.theKey).toBe('value');
      expect(() => {
        getKey(obj);
      }).toThrowError(NonConformingError);
    });

    it('fails when passed null and non-objects', () => {
      expect(() => {
        getKey(null);
      }).toThrowError(NonConformingError);

      expect(() => {
        getKey();
      }).toThrowError(NonConformingError);

      expect(() => {
        getKey(NaN);
      }).toThrowError(NonConformingError);

      expect(() => {
        getKey('');
      }).toThrowError(NonConformingError);

      if (typeof Symbol !== undefined) {
        expect(() => {
          getKey(Symbol.iterator);
        }).toThrowError(NonConformingError);
      }
    });
  });
});
