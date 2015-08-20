/*global describe,it,expect*/

import {unpack} from '../';

describe('unpack', () => {
  it('unpacks key/values', () => {
    const obj = { theKey: 'theValue' };
    const [key, value] = unpack(obj);

    expect(key).toBe('theKey');
    expect(value).toBe('theValue');
  });
});
