'use strict';

// MODULES //

var isPositive = require( 'validate.io-positive-primitive' );


// FUNCTIONS //

var sqrt = Math.sqrt;


// SKEWNESS //

/**
* FUNCTION skewness( k )
*	Computes the distribution skewness for a Chi-squared distribution with parameter k.
*
* @param {Number} k - degrees of freedom
* @returns {Number} distribution skewness
*/
function skewness( k ) {
	if ( !isPositive( k ) ) {
		return NaN;
	}
	return sqrt( 8 / k );
} // end FUNCTION skewness()


// EXPORTS

module.exports =  skewness;
