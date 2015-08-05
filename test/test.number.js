/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Validate a value is NaN:
	isnan = require( 'validate.io-nan' ),

	// Module to be tested:
	skewness = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'number skewness', function tests() {

	it( 'should export a function', function test() {
		expect( skewness ).to.be.a( 'function' );
	});

	it( 'should compute the distribution skewness', function test() {
		assert.closeTo( skewness( 2 ), 2, 1e-5 );
		assert.closeTo( skewness( 4  ), 1.4142136, 1e-5 );
		assert.closeTo( skewness( 8  ), 1, 1e-5 );
		assert.closeTo( skewness( 16  ), 0.7071068, 1e-5 );
	});

	it( 'should return `NaN` for invalid values of parameter k', function test() {
		assert.isTrue( isnan( skewness( -1 ) ) );
	});

});
