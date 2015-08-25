/*global describe,it,expect,pending*/

import {match, MatchError} from '../src';

describe('match', () => {
  it('matches a key, and runs its callback immediately', () => {
    const obj = { grant: 'denasty' };
    /* Assigning to this will be a detectable side-effect, knowing for sure
     * the callback was called. */
    var wildcard;

    match(obj, {
      trevor() {
        wildcard = 'vampire killer';
      },

      sypha() {
        wildcard = 'magic';
      },

      grant() {
        wildcard = 'daggers';
      }
    });

    expect(wildcard).toBe('daggers');
  });

  it("matches a key, and returns its callback's result", () => {
    const obj = { sypha: 'belnades' };

    const value = match(obj, {
      trevor: () => 'vampire killer',
      sypha: () => 'magic',
      grant: () => 'daggers'
    });

    expect(value).toBe('magic');
  });

  it('calls the matching callback with its value and key, respectively', () => {
    const obj = { trevor: 'belmont' };

    const title = name => {
      expect(name).toBeDefined();
      expect(typeof name).toBe('string');
      return name.substr(0, 1).toUpperCase() + name.substr(1);
    };

    const value = match(obj, {
      trevor: (val, key) => `${title(key)} "Vampire Killer" ${title(val)}`,
      sypha: (val, key) => `"Magic" ${title(key)} ${title(val)}`,
      grant: (val, key) => `${title(key)} "Daggers" ${title(val)}`
    });

    expect(value).toBe('Trevor "Vampire Killer" Belmont');
  });

  it('throws a MatchError when no key matches in the map', () => {
    const obj = { alucard: 'tepes' };

    expect(() => {
      match(obj, {
        trevor: () => 'vampire killer',
        sypha: () => 'magic',
        grant: () => 'daggers'
      });
    }).toThrowError(MatchError);
  });

  it('calls the third argument when no match is made', () => {
    const obj = { alucard: 'tepes' };

    const answer = match(obj,
      {
        trevor: () => 'vampire killer',
        sypha: () => 'magic',
        grant: () => 'daggers'
      },
      (value, key) => `I don't know what to do with ${key} ${value}`
    );

    expect(answer).toBe("I don't know what to do with alucard tepes");
  });
});
