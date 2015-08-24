/*global describe,it,expect*/

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

  it('throws a MatchError when no key matches in the map', () => {
    const obj = { alucard: 'dracula' };

    expect(() => {
      match(obj, {
        trevor: () => 'vampire killer',
        sypha: () => 'magic',
        grant: () => 'daggers'
      });
    }).toThrowError(MatchError);
  });
});
