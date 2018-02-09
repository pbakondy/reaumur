/*global define, describe, it, expect, beforeEach, spyOn, jasmine */

describe('reaumur', function() {

  describe('init value', function() {

    beforeEach(function() {
      reaumur.from('K', 0);
    });

    it('value', function() {
      expect( reaumur.value ).toBe(0);
    });
    it('get()', function() {
      expect( reaumur.get() ).toEqual({ name: jasmine.any(String), sign: jasmine.any(String), value: jasmine.any(Number) });
    });
    it('get() name', function() {
      expect( reaumur.get().name ).toBe('Kelvin');
    });
    it('get() sign', function() {
      expect( reaumur.get().sign ).toBe('K');
    });
    it('get() value', function() {
      expect( reaumur.get().value ).toBe(0);
    });
    it('toString()', function() {
      expect( reaumur.toString() ).toBe('0 K');
    });
    it('constructor', function() {
      expect( reaumur.constructor.name ).toBe('Reaumur');
    });

  });


  describe('from()', function() {

    beforeEach(function() {
      reaumur.from('K', 0);
    });

    it('valid parameters', function() {
      expect( reaumur.from('K', 0) ).toBeDefined();
    });
    it('invalid scale ID', function() {
      expect( function() { reaumur.from('XX', 0); } ).toThrowError(TypeError, 'Unknown type');
    });
    it('invalid scale type', function() {
      expect( function() { reaumur.from(0, 0); } ).toThrowError(TypeError, 'Parameter "type" must be a string');
    });
    it('empty parameters', function() {
      expect( function() { reaumur.from(); } ).toThrowError(TypeError, 'Parameter "type" must be a string');
    });
    it('invalid value type', function() {
      expect( function() { reaumur.from('K', 'K'); } ).toThrowError(TypeError, 'Parameter "value" must be a number');
    });

  });


  describe('to()', function() {

    beforeEach(function() {
      reaumur.from('K', 0);
    });

    it('valid parameters', function() {
      expect( reaumur.to('C') ).toBeDefined();
    });
    it('invalid scale ID', function() {
      expect( function() { reaumur.to('XX'); } ).toThrowError(TypeError, 'Unknown type');
    });
    it('invalid scale type', function() {
      expect( function() { reaumur.to(0); } ).toThrowError(TypeError, 'Parameter "type" must be a string');
    });
    it('invalid value type', function() {
      expect( function() { reaumur.to(); } ).toThrowError(TypeError, 'Parameter "type" must be a string');
    });

  });


  describe('getScaleIDs()', function() {

    it('valid parameters', function() {
      expect( Object.prototype.toString.call(reaumur.getScaleIDs()) ).toBe('[object Array]');
    });
    it('valid parameters', function() {
      expect( reaumur.getScaleIDs().length ).toBe(9);
    });

  });


  describe('toAll()', function() {

    var all;
    var scales = reaumur.getScaleIDs();

    beforeEach(function() {
      all = reaumur.from('K', 0).toAll();
    });

    it('typeof', function() {
      expect( typeof all ).toBe('object');
    });

    it('Object.keys().length', function() {
      var len = Object.keys(all).length;
      expect( len ).toBe(scales.length);
    });

    it('[0].get()', function() {
      var len = Object.keys(all).length;

      var id = Object.keys(all)[0];
      expect( all[id].get() ).toEqual({ name: jasmine.any(String), sign: jasmine.any(String), value: jasmine.any(Number) });

      id = Object.keys(all)[len - 1];
      expect( all[id].get() ).toEqual({ name: jasmine.any(String), sign: jasmine.any(String), value: jasmine.any(Number) });
    });

    it('constructor', function() {
      var len = Object.keys(all).length;

      var id = Object.keys(all)[0];
      expect( all[id].constructor.name ).toBe('Reaumur');

      id = Object.keys(all)[len - 1];
      expect( all[id].constructor.name ).toBe('Reaumur');
    });

  });


  describe('convert between all vs all', function() {

    var scales = reaumur.getScaleIDs();
    var scaleFrom, scaleTo, label, value, startTemp;

    for (var i = 0, len = scales.length; i < len; i++) {
      scaleFrom = scales[i];
      for (var j = 0, len = scales.length; j < len; j++) {
        scaleTo = scales[j];
        label = scaleFrom + ' -> ' + scaleTo + ' -> ' + scaleFrom;

        // test with zero degree
        startTemp = 0;
        value = reaumur.from(scaleFrom, startTemp).to(scaleTo).to(scaleFrom).value;
        testConvert(value, label + ' (with ' + startTemp + ' degree)', startTemp);

        // test with 100 degree
        startTemp = 100;
        value = reaumur.from(scaleFrom, startTemp).to(scaleTo).to(scaleFrom).value;
        testConvert(value, label + ' (with ' + startTemp + ' degree)', startTemp);

        // test with 'whole number' degree
        startTemp = Math.round(Math.random() * 100);
        value = reaumur.from(scaleFrom, startTemp).to(scaleTo).to(scaleFrom).value;
        testConvert(value, label + ' (with ' + startTemp + ' degree)', startTemp);

        // test with 'round number with two digits' degree
        startTemp = Math.round(Math.random() * 10000) / 100;
        value = reaumur.from(scaleFrom, startTemp).to(scaleTo).to(scaleFrom).value;
        testConvert(value, label + ' (with ' + startTemp + ' degree)', startTemp);

      }
    }

    function testConvert(input, label, result) {
      it(label, function() {
        expect( input ).toBeCloseTo(result, 1);
      });
    }

  });


});
