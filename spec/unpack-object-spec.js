/*global describe,it,expect*/

import {unpackObject} from '../src';

describe('unpackObject', () => {
  it('unpacks key/values', () => {
    const obj = { theKey: 'theValue' };
    const {key, value} = unpackObject(obj);

    expect(key).toBe('theKey');
    expect(value).toBe('theValue');
  });
});
