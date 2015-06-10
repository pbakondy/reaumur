# Réaumur.js

[![Build Status](https://travis-ci.org/pbakondy/reaumur.svg?branch=master)](https://travis-ci.org/pbakondy/reaumur)

Conversion between units of temperature:

- [Kelvin](http://en.wikipedia.org/wiki/Kelvin)
- [Celsius](http://en.wikipedia.org/wiki/Celsius)
- [Fahrenheit](http://en.wikipedia.org/wiki/Fahrenheit)
- [Rankine](http://en.wikipedia.org/wiki/Rankine_scale)
- [Delisle](http://en.wikipedia.org/wiki/Delisle_scale)
- [Newton](http://en.wikipedia.org/wiki/Newton_scale)
- [Réaumur](http://en.wikipedia.org/wiki/R%C3%A9aumur_scale)
- [Rømer](http://en.wikipedia.org/wiki/R%C3%B8mer_scale)

## Installation

Grab the zip file or install with bower:

```
bower install reaumur
```

Or install it with npm:

```
npm install reaumur
```


## Usage

You can use this library as a **node.js module**, an **AMD module** or called from the global scope with **window.reaumur**.

The library starts with this initial value: 0 Kelvin.

The calculated temperature values are rounded to two digits.

The library methods are chainable.

### Methods

- <code>reaumur.getScaleIDs()</code> - returns the available scale identifiers in an Array
  - <code>[ 'K', 'C', 'F', 'R', 'D', 'N', 'Re', 'Ro' ]</code>
- <code>reaumur.get()</code> - returns an object with the details of the current state
  - <code>{ name: 'Kelvin', sign: 'K', value: 0 }</code>
- <code>reaumur.from( &lt;scale&gt;, &lt;value&gt; )</code> - sets and initial scale and value, chainable
- <code>reaumur.to( &lt;scale&gt; )</code> - converts to a different scale, chainable
- <code>reaumur.toAll()</code> - returns all the converted values, chainable
  - <code>{ 'K': &lt;Reaumur object&gt;, 'C': &lt;Reaumur object&gt;, 'F': &lt;Reaumur object&gt;, ... }</code>
- <code>reaumur.toString()</code> - returns "value + sign" version of current state
  - <code>0 K</code>

### Examples

0 Kelvin to Celsius

```
reaumur.from('K', 0).to('C').get()
// { name: "Celsius", sign: "°C", value: -273.15 }
```

0 Celsius to Kelvin

```
reaumur.from('C', 0).to('K').get().value
// 273.15
```

0 Celsius to Fahrenheit

```
reaumur.from('C', 0).to('F').get().value
// 32
```


35 Réaumur to Celsius ( [forrás](http://magyar-irodalom.elte.hu/ezredveg/0208-9/0208-93.html#rl) )

```
reaumur.from('Re', 35).to('C').get().value
// 43.75
```

0 Celsius to all

```
var all = reaumur.from('C', 0).toAll();
all.K.get().value // 273.15
all.F.get().value // 32
all.Re.get().value // 0
...
```


## Build

```
gulp build
```


## Test

Validation test (JS)

```
gulp lint
```

Unit test (with Karma, Jasmine and PhantomJS)

```
gulp test
```

## License

Réaumur.js is licensed under the MIT Open Source license. For more information, see the LICENSE file in this repository.
