// Réaumur.js
// https://github.com/pbakondy/reaumur
// Peter Bakondy <pbakondy@gmail.com>
// version 1.0.0

(function(global) {
  // http://en.wikipedia.org/wiki/Conversion_of_units_of_temperature
  // https://www.explainxkcd.com/wiki/index.php/1923:_Felsius
  
  'use strict';

  var scales = {
    'K': {
      'id': 'K',
      'name': 'Kelvin',
      'sign': 'K',
      'to': {
        'K': function(x) { return x; },
        'C': function(x) { return x - 273.15; },
        'F': function(x) { return x * 9 / 5 - 459.67; },
        'Fe': function(x) { return x * 11 / 4 - 366.41; },
        'R': function(x) { return x * 9 / 5; },
        'D': function(x) { return (373.15 - x) * 3 / 2; },
        'N': function(x) { return (x - 273.15) * 33 / 100; },
        'Re': function(x) { return (x - 273.15) * 4 / 5; },
        'Ro': function(x) { return (x - 273.15) * 21 / 40 + 7.5; }
      }
    },
    'C': {
      'id': 'C',
      'name': 'Celsius',
      'sign': '°C',
      'to': {
        'K': function(x) { return x + 273.15; },
        'C': function(x) { return x; },
        'F': function(x) { return x * 9 / 5 + 32; },
        'Fe': function(x) { return x * 1.4 +16; },
        'R': function(x) { return (x + 273.15) * 9 / 5; },
        'D': function(x) { return (100 - x) * 3 / 2; },
        'N': function(x) { return x * 33 / 100; },
        'Re': function(x) { return x * 4 / 5; },
        'Ro': function(x) { return x * 21 / 40 + 7.5; }
      }
    },
    'F': {
      'id': 'F',
      'name': 'Fahrenheit',
      'sign': '°F',
      'to': {
        'K': function(x) { return (x + 459.67) * 5 / 9; },
        'C': function(x) { return (x - 32) * 5 / 9; },
        'F': function(x) { return x; },
        'Fe': function(x) { return x * 7 / 9 - 80 / 9; },
        'R': function(x) { return x + 459.67; },
        'D': function(x) { return (212 - x) * 5 / 6; },
        'N': function(x) { return (x - 32) * 11 / 60; },
        'Re': function(x) { return (x - 32) * 4 / 9; },
        'Ro': function(x) { return (x - 32) * 7 / 24 + 7.5; }
      }
    },
    'Fe': {
      'id': 'Fe',
      'name': 'Felsius',
      'sign': '°⋲',
      'to': {
        'K': function(x) { return (x + 459.67) * 5 / 9; },
        'C': function(x) { return (x - 32) * 5 / 9; },
        'F': function(x) { return x; },
        'Fe': function(x) { return x; },
        'R': function(x) { return x + 459.67; },
        'D': function(x) { return (212 - x) * 5 / 6; },
        'N': function(x) { return (x - 32) * 11 / 60; },
        'Re': function(x) { return (x - 32) * 4 / 9; },
        'Ro': function(x) { return (x - 32) * 7 / 24 + 7.5; }
      }
    },
    'R': {
      'id': 'R',
      'name': 'Rankine',
      'sign': '°R',
      'to': {
        'K': function(x) { return x * 5 / 9; },
        'C': function(x) { return (x - 491.67) * 5 / 9; },
        'F': function(x) { return x - 459.67; },
        'Fe': function(x) { return x * 1.4 + 475.67; },
        'R': function(x) { return x; },
        'D': function(x) { return (671.67 - x) * 5 / 6; },
        'N': function(x) { return (x - 491.67) * 11 / 60; },
        'Re': function(x) { return (x - 491.67) * 4 / 9; },
        'Ro': function(x) { return (x - 491.67) * 7 / 24 + 7.5; }
      }
    },
    'D': {
      'id': 'D',
      'name': 'Delisle',
      'sign': '°D',
      'to': {
        'K': function(x) { return 373.15 - x * 2 / 3; },
        'C': function(x) { return 100 - x * 2 / 3; },
        'F': function(x) { return 212 - x * 6 / 5; },
        'Fe': function(x) { return 163.33 - x * 7 / 6; },
        'R': function(x) { return 671.67 - x * 6 / 5; },
        'D': function(x) { return x; },
        'N': function(x) { return 33 - x * 11 / 50; },
        'Re': function(x) { return 80 - x * 8 / 15; },
        'Ro': function(x) { return 60 - x * 7 / 20; }
      }
    },
    'N': {
      'id': 'N',
      'name': 'Newton',
      'sign': '°N',
      'to': {
        'K': function(x) { return x * 100 / 33 + 273.15; },
        'C': function(x) { return x * 100 / 33; },
        'F': function(x) { return x * 60 / 11 + 32; },
        'Fe': function(x) { return x * 77 / 300 - 44 / 15; },
        'R': function(x) { return x * 60 / 11 + 491.67; },
        'D': function(x) { return (33 - x) * 50 / 11; },
        'N': function(x) { return x; },
        'Re': function(x) { return x * 80 / 33; },
        'Ro': function(x) { return x * 35 / 22 + 7.5; }
      }
    },
    'Re': {
      'id': 'Re',
      'name': 'Réaumur',
      'sign': '°Ré',
      'to': {
        'K': function(x) { return x * 5 / 4 + 273.15; },
        'C': function(x) { return x * 5 / 4; },
        'F': function(x) { return x * 9 / 4 + 32; },
        'Fe': function(x) { return x * 28 / 45 - 64 / 9; },
        'R': function(x) { return x * 9 / 4 + 491.67; },
        'D': function(x) { return (80 - x) * 15 / 8; },
        'N': function(x) { return x * 33 / 80; },
        'Re': function(x) { return x; },
        'Ro': function(x) { return x * 21 / 32 + 7.5; }
      }
    },
    'Ro': {
      'id': 'Ro',
      'name': 'Rømer',
      'sign': '°Rø',
      'to': {
        'K': function(x) { return (x - 7.5) * 40 / 21 + 273.15; },
        'C': function(x) { return (x - 7.5) * 40 / 21; },
        'F': function(x) { return (x - 7.5) * 24 / 7 + 32; },
        'Fe': function(x) { return x * 49 / 120 + 17 / 6; },
        'R': function(x) { return (x - 7.5) * 24 / 7 + 491.67; },
        'D': function(x) { return (60 - x) * 20 / 7; },
        'N': function(x) { return (x - 7.5) * 22 / 35; },
        'Re': function(x) { return (x - 7.5) * 32 / 21; },
        'Ro': function(x) { return x; }
      }
    }
  };


  function round2(val) {
    return Math.round(100 * val) / 100;
  }


  function Reaumur(type, value) {
    this.type = scales[type] ? scales[type] : scales.K;
    this.value = typeof value === 'number' ? value : 0;

    return this;
  }

  Reaumur.prototype.getScaleIDs = function() {
    return Object.keys(scales);
  };

  Reaumur.prototype.get = function() {
    return {
      'name': this.type.name,
      'sign': this.type.sign,
      'value': this.value
    };
  };

  Reaumur.prototype.from = function(type, value) {
    if (typeof type !== 'string') {
      throw new TypeError('Parameter "type" must be a string');
    }
    if (typeof value !== 'number') {
      throw new TypeError('Parameter "value" must be a number');
    }

    var newType = scales[type];
    if (typeof newType === 'undefined') {
      throw new TypeError('Unknown type');
    }

    this.type = newType;
    this.value = value;

    return this;
  };

  Reaumur.prototype.to = function(type) {
    if (typeof type !== 'string') {
      throw new TypeError('Parameter "type" must be a string');
    }

    var fn = this.type.to[type];
    if (typeof fn !== 'function') {
      throw new TypeError('Unknown type');
    }

    this.value = round2(fn(this.value));
    this.type = scales[type];

    return this;
  };

  Reaumur.prototype.toAll = function() {
    var keys = Object.keys(this.type.to);
    var ret = {};

    for (var i = 0; i < keys.length; i++) {
      ret[keys[i]] = new Reaumur(keys[i], round2(this.type.to[keys[i]](this.value)));
    }

    return ret;
  };

  Reaumur.prototype.toString = function() {
    return this.value + ' ' + this.type.sign;
  };



  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    // register as node.js module
    module.exports = new Reaumur();
  } else {
    if (typeof define === 'function' && define.amd) {
      // register as AMD module
      define([], function() {
        return new Reaumur();
      });
    } else {
      // register to global scope
      global.reaumur = new Reaumur();
    }
  }

})(this);
