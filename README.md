Skewness
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependencies][dependencies-image]][dependencies-url]

> [Chi-squared](https://en.wikipedia.org/wiki/Chi-squared_distribution) distribution [skewness](https://en.wikipedia.org/wiki/skewness).

The [skewness](https://en.wikipedia.org/wiki/skewness) for a [Chi-squared](https://en.wikipedia.org/wiki/Chi-squared_distribution) random variable is

<div class="equation" align="center" data-raw-text="\operatorname{skew}\left( X \right) = \sqrt{8/k}" data-equation="eq:skewness">
	<img src="https://cdn.rawgit.com/distributions-io/chisquare-skewness/c0b57e85705ee6d8d9c41b7c0ce8011ed5bd2e24/docs/img/eqn.svg" alt="Skewness for a Chi-squared distribution.">
	<br>
</div>

where `k > 0` is the degrees of freedom.


## Installation

``` bash
$ npm install distributions-chisquare-skewness
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var skewness = require( 'distributions-chisquare-skewness' );
```

#### skewness( k[, opts] )

Computes the [skewness](https://en.wikipedia.org/wiki/skewness) for a [Chi-squared](https://en.wikipedia.org/wiki/Chi-squared_distribution) distribution with parameter `k`. `k` may be either a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or a [`matrix`](https://github.com/dstructs/matrix).

``` javascript
var matrix = require( 'dstructs-matrix' ),
	data,
	mat,
	out,
	i;

out = skewness( 2 );
// returns ~2.000

k = [ 2, 4, 8, 16 ];
out = skewness( k );

// returns [ ~2.000, ~1.414, ~1.000, ~0.707 ]

k = new Float32Array( k );
out = skewness( k );
// returns Float64Array( [~2.000,~1.414,~1.000,~0.707] )

k =  matrix( [ 2, 4, 8, 16 ], [2,2] );
/*
	[ 2 4,
	  8 16 ]
*/

out = skewness( k );
/*
	[ ~2.000 ~1.414,
	  ~1.000 ~0.707 ]
*/
```

The function accepts the following `options`:

* 	__accessor__: accessor `function` for accessing `array` values.
* 	__dtype__: output [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix) data type. Default: `float64`.
*	__copy__: `boolean` indicating if the `function` should return a new data structure. Default: `true`.
*	__path__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path.
*	__sep__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path separator. Default: `'.'`.

For non-numeric `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var k = [
	[0,2],
	[1,4],
	[2,8],
	[3,16]
];

function getValue( d, i ) {
	return d[ 1 ];
}

var out = skewness( k, {
	'accessor': getValue
});
// returns [ ~2.000, ~1.414, ~1.000, ~0.707 ]
```

To [deepset](https://github.com/kgryte/utils-deep-set) an object `array`, provide a key path and, optionally, a key path separator.

``` javascript
var k = [
	{'x':[9,2]},
	{'x':[9,4]},
	{'x':[9,8]},
	{'x':[9,16]}
];

var out = skewness( k, 'x|1', '|' );
/*
	[
		{'x':[9,~2.000]},
		{'x':[9,~1.414]},
		{'x':[9,~1.000]},
		{'x':[9,~0.707]},
	]
*/

var bool = ( data === out );
// returns true
```

By default, when provided a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix), the output data structure is `float64` in order to preserve precision. To specify a different data type, set the `dtype` option (see [`matrix`](https://github.com/dstructs/matrix) for a list of acceptable data types).

``` javascript
var k, out;

k = new Float64Array( [ 2,4,8,16 ] );

out = skewness( k, {
	'dtype': 'int32'
});
// returns Int32Array( [ 2,1,1,0 ] )

// Works for plain arrays, as well...
out = skewness( [2,4,8,16], {
	'dtype': 'int32'
});
// returns Int32Array( [ 2,1,1,0 ] )
```

By default, the function returns a new data structure. To mutate the input data structure (e.g., when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
var k,
	bool,
	mat,
	out,
	i;

k = [ 2, 4, 8, 16 ];

out = skewness( k, {
	'copy': false
});
// returns [ ~2.000, ~1.414, ~1.000, ~0.707 ]

bool = ( data === out );
// returns true

mat = matrix( [ 2, 4, 8, 16 ], [2,2] );
/*
	[ 2 4,
	  8 16 ]
*/

out = skewness( mat, {
	'copy': false
});
/*
	[ ~2.000 ~1.414,
	  ~1.000 ~0.707 ]
*/

bool = ( mat === out );
// returns true
```


## Notes

*	If an element is __not__ a positive number, the [skewness](https://en.wikipedia.org/wiki/skewness) is `NaN`.

	``` javascript
	var k, out;

	out = skewness( -1 );
	// returns NaN

	out = skewness( 0 );
	// returns NaN

	out = skewness( null );
	// returns NaN

	out = skewness( true );
	// returns NaN

	out = skewness( {'a':'b'} );
	// returns NaN

	out = skewness( [ true, null, [] ] );
	// returns [ NaN, NaN, NaN ]

	function getValue( d, i ) {
		return d.x;
	}
	k = [
		{'x':true},
		{'x':[]},
		{'x':{}},
		{'x':null}
	];

	out = skewness( k, {
		'accessor': getValue
	});
	// returns [ NaN, NaN, NaN, NaN ]

	out = skewness( k, {
		'path': 'x'
	});
	/*
		[
			{'x':NaN},
			{'x':NaN},
			{'x':NaN,
			{'x':NaN}
		]
	*/
	```

*	Be careful when providing a data structure which contains non-numeric elements and specifying an `integer` output data type, as `NaN` values are cast to `0`.

	``` javascript
	var out = skewness( [ true, null, [] ], {
		'dtype': 'int8'
	});
	// returns Int8Array( [0,0,0] );
	```


## Examples

``` javascript
var matrix = require( 'dstructs-matrix' ),
	skewness = require( 'distributions-chisquare-skewness' );

var k,
	mat,
	out,
	tmp,
	i;

// Plain arrays...
k = new Array( 10 );
for ( i = 0; i < k.length; i++ ) {
	k[ i ] = i;
}
out = skewness( k );

// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < k.length; i++ ) {
	k[ i ] = {
		'x': k[ i ]
	};
}
out = skewness( k, {
	'accessor': getValue
});

// Deep set arrays...
for ( i = 0; i < k.length; i++ ) {
	k[ i ] = {
		'x': [ i, k[ i ].x ]
	};
}
out = skewness( k, {
	'path': 'x/1',
	'sep': '/'
});

// Typed arrays...
k = new Float64Array( 10 );
for ( i = 0; i < k.length; i++ ) {
	k[ i ] = i;
}
out = skewness( k );

// Matrices...
mat = matrix( k, [5,2], 'float64' );
out = skewness( mat );

// Matrices (custom output data type)...
out = skewness( mat, {
	'dtype': 'uint8'
});
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```



## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/distributions-chisquare-skewness.svg
[npm-url]: https://npmjs.org/package/distributions-chisquare-skewness

[travis-image]: http://img.shields.io/travis/distributions-io/chisquare-skewness/master.svg
[travis-url]: https://travis-ci.org/distributions-io/chisquare-skewness

[codecov-image]: https://img.shields.io/codecov/c/github/distributions-io/chisquare-skewness/master.svg
[codecov-url]: https://codecov.io/github/distributions-io/chisquare-skewness?branch=master

[dependencies-image]: http://img.shields.io/david/distributions-io/chisquare-skewness.svg
[dependencies-url]: https://david-dm.org/distributions-io/chisquare-skewness

[dev-dependencies-image]: http://img.shields.io/david/dev/distributions-io/chisquare-skewness.svg
[dev-dependencies-url]: https://david-dm.org/dev/distributions-io/chisquare-skewness

[github-issues-image]: http://img.shields.io/github/issues/distributions-io/chisquare-skewness.svg
[github-issues-url]: https://github.com/distributions-io/chisquare-skewness/issues
