/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Deep close to:
	deepCloseTo = require( './utils/deepcloseto.js' ),

	// Module to be tested:
	skewness = require( './../lib/accessor.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'accessor skewness', function tests() {

	it( 'should export a function', function test() {
		expect( skewness ).to.be.a( 'function' );
	});

	it( 'should compute the distribution skewness using an accessor', function test() {
		var k, actual, expected;

		k = [
			{'k':2},
			{'k':4},
			{'k':8},
			{'k':16}
		];
		actual = new Array( k.length );

		actual = skewness( actual, k, getValue );
		expected = [ 2, 1.4142136, 1, 0.7071068 ];

		assert.isTrue( deepCloseTo( actual, expected, 1e-5 ) );

		function getValue( d ) {
			return d.k;
		}
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( skewness( [], [], getValue ), [] );
		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var k, actual, expected;

		k = [
			{'x':true},
			{'x':null},
			{'x':[]},
			{'x':{}}
		];
		actual = new Array( k.length );
		actual = skewness( actual, k, getValue );

		expected = [ NaN, NaN, NaN, NaN ];

		assert.deepEqual( actual, expected );

		function getValue( d ) {
			return d.x;
		}
	});

});
