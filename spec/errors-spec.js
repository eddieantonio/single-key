/*global describe,it,expect,jasmine,pending*/

import {NonConformingError, MatchError} from '../src';

describe('errors', () => {
  describe('NonConformingError', () => {
    it('is a subclass of TypeError', () => {
      let err = new NonConformingError();
      expect(err).toEqual(jasmine.any(TypeError));
    });
  });

  describe('MatchError', () => {
    it('is a subclass of Error', () => {
      let err = new NonConformingError();
      expect(err).toEqual(jasmine.any(Error));
    });
  });
});
