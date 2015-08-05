/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Deep close to:
	deepCloseTo = require( './utils/deepcloseto.js' ),

	// Validate a value is NaN:
	isnan = require( 'validate.io-nan' ),

	// Module to be tested:
	skewness = require( './../lib' ),

	// Function to apply element-wise
	SKEWNESS = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-skewness', function tests() {

	it( 'should export a function', function test() {
		expect( skewness ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided an invalid option', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				skewness( [1,2,3], {
					'accessor': value
				});
			};
		}
	});

	it( 'should throw an error if provided an array and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				skewness( [1,2,3], {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided a typed-array and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				skewness( new Int8Array([1,2,3]), {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided a matrix and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				skewness( matrix( [2,2] ), {
					'dtype': value
				});
			};
		}
	});

	it( 'should return NaN if the first argument is neither a number, array-like, or matrix-like', function test() {
		var values = [
			// '5', // valid as is array-like (length)
			true,
			undefined,
			null,
			// NaN, // allowed
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			assert.isTrue( isnan( skewness( values[ i ] ) ) );
		}
	});

	it( 'should compute the distribution skewness when provided a number', function test() {
		assert.closeTo( skewness( 2 ), 2, 1e-5 );
		assert.closeTo( skewness( 4  ), 1.4142136, 1e-5 );
		assert.closeTo( skewness( 8  ), 1, 1e-5 );
		assert.closeTo( skewness( 16  ), 0.7071068, 1e-5 );
	});

	it( 'should compute the distribution skewness when provided a plain array', function test() {
		var k, actual, expected;

		k = [ 2, 4, 8, 16 ];
		expected = [ 2, 1.4142136, 1, 0.7071068 ];

		actual = skewness( k );
		assert.notEqual( actual, k );
		assert.isTrue( deepCloseTo( actual, expected, 1e-5 ) );

		// Mutate...
		actual = skewness( k, {
			'copy': false
		});
		assert.strictEqual( actual, k );
		assert.isTrue( deepCloseTo( actual, expected, 1e-5 ) );
	});

	it( 'should compute the distribution skewness when provided a typed array', function test() {
		var k, actual, expected;

		k = new Float64Array ( [ 2,4,8,16 ] );
		expected = new Float64Array( [ 2,1.4142136,1,0.7071068 ] );

		actual = skewness( k );
		assert.notEqual( actual, k );
		assert.isTrue( deepCloseTo( actual, expected, 1e-5 ) );

		// Mutate:
		actual = skewness( k, {
			'copy': false
		});
		expected = new Float64Array( [ 2,1.4142136,1,0.7071068 ] );
		assert.strictEqual( actual, k );
		assert.isTrue( deepCloseTo( actual, expected, 1e-5 ) );
	});

	it( 'should compute the distribution skewness and return an array of a specific type', function test() {
		var k, actual, expected;

		k = [ 2, 4, 8, 16 ];
		expected = new Int32Array( [ 2,1.4142136,1,0.7071068 ] );

		actual = skewness( k, {
			'dtype': 'int32'
		});
		assert.notEqual( actual, k );
		assert.strictEqual( actual.BYTES_PER_ELEMENT, 4 );
		assert.isTrue( deepCloseTo( actual, expected, 1e-5 ) );
	});

	it( 'should compute the distribution skewness using an accessor', function test() {
		var k, actual, expected;

		k = [
			{'k':2},
			{'k':4},
			{'k':8},
			{'k':16}
		];
		expected = [ 2, 1.4142136, 1, 0.7071068 ];

		actual = skewness( k, {
			'accessor': getValue
		});
		assert.notEqual( actual, k );
		assert.isTrue( deepCloseTo( actual, expected, 1e-5 ) );

		// Mutate:
		actual = skewness( k, {
			'accessor': getValue,
			'copy': false
		});
		assert.strictEqual( actual, k );
		assert.isTrue( deepCloseTo( actual, expected, 1e-5 ) );

		function getValue( d ) {
			return d.k;
		}
	});

	it( 'should compute an element-wise distribution skewness and deep set', function test() {
		var data, actual, expected;

		data = [
			{'x':[9,2]},
			{'x':[9,4]},
			{'x':[9,8]},
			{'x':[9,16]}
		];

		expected = [
			{'x':[9,2]},
			{'x':[9,1.4142136]},
			{'x':[9,1]},
			{'x':[9,0.7071068]}
		];

		actual = skewness( data, {
			'path': 'x.1'
		});
		assert.strictEqual( actual, data );
		assert.isTrue( deepCloseTo( actual, expected, 1e-5 ) );

		// Specify a path with a custom separator...
		data = [
			{'x':[9,2]},
			{'x':[9,4]},
			{'x':[9,8]},
			{'x':[9,16]}
		];

		actual = skewness( data, {
			'path': 'x/1',
			'sep': '/'
		});
		assert.strictEqual( actual, data );
		assert.isTrue( deepCloseTo( actual, expected, 1e-5 ) );
	});

	it( 'should compute an element-wise distribution skewness when provided a matrix', function test() {
		var mat,
			out,
			d1,
			d2,
			i;

		d1 = new Float64Array( 25 );
		d2 = new Float64Array( 25 );
		for ( i = 0; i < d1.length; i++ ) {
			d1[ i ] = i / 10;
			d2[ i ] = SKEWNESS( i / 10 );
		}
		mat = matrix( d1, [5,5], 'float64' );
		out = skewness( mat );

		assert.deepEqual( out.data, d2 );

		// Mutate...
		out = skewness( mat, {
			'copy': false
		});
		assert.strictEqual( mat, out );
		assert.deepEqual( mat.data, d2 );
	});

	it( 'should compute an element-wise distribution skewness and return a matrix of a specific type', function test() {
		var mat,
			out,
			d1,
			d2,
			i;

		d1 = new Float64Array( 25 );
		d2 = new Float32Array( 25 );
		for ( i = 0; i < d1.length; i++ ) {
			d1[ i ] = i + 1;
			d2[ i ] = SKEWNESS( i + 1 );
		}
		mat = matrix( d1, [5,5], 'float64' );
		out = skewness( mat, {
			'dtype': 'float32'
		});

		assert.strictEqual( out.dtype, 'float32' );
		assert.deepEqual( out.data, d2 );
	});

	it( 'should return an empty data structure if provided an empty data structure', function test() {
		assert.deepEqual( skewness( [] ), [] );
		assert.deepEqual( skewness( matrix( [0,0] ) ).data, new Float64Array() );
		assert.deepEqual( skewness( new Int8Array() ), new Float64Array() );
	});

});
